"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { requireAdmin, audit } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createJudge(prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const panelIdRaw = formData.get("panelId") as string | null;

    if (!firstName || !lastName || !email || !username || !password || !panelIdRaw) {
      return { error: "All fields are required to provision a judge." };
    }

    const panelId = parseInt(panelIdRaw, 10);
    if (!Number.isInteger(panelId) || panelId < 1) {
      return { error: "Panel must be a positive integer." };
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return { error: "User with this email or username already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const judge = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      passwordHash,
      role: "judge",
      status: "active",
      panelId,
    });

    await audit(actor, "judge.create", { type: "User", id: judge._id }, { panelId });
    revalidatePath("/admin/judges");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function disableJudge(userId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const user = await User.findById(userId);
    if (!user || user.role !== "judge") return { error: "Judge not found" };

    user.status = "disabled";
    await user.save();

    await audit(actor, "judge.disable", { type: "User", id: user._id });
    revalidatePath("/admin/judges");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function approveJudge(userId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const user = await User.findById(userId);
    if (!user || user.role !== "judge") return { error: "Judge not found" };

    user.status = "active";
    await user.save();

    await audit(actor, "judge.approve", { type: "User", id: user._id });
    revalidatePath("/admin/judges");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function rejectJudge(userId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const user = await User.findById(userId);
    if (!user || user.role !== "judge") return { error: "Judge not found" };

    user.status = "disabled";
    await user.save();

    await audit(actor, "judge.reject", { type: "User", id: user._id });
    revalidatePath("/admin/judges");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}
