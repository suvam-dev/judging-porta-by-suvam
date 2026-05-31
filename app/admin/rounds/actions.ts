"use server";

import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { requireAdmin, audit } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

export async function createRound(prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const name = formData.get("name") as string;
    const orderStr = formData.get("order") as string;

    if (!name || !orderStr) {
      return { error: "Name and Order are required." };
    }

    const order = parseInt(orderStr, 10);

    const existing = await Round.findOne({ order });
    if (existing) {
      return { error: `A round with order ${order} already exists.` };
    }

    const round = await Round.create({ name, order, status: "draft" });

    await audit(actor, "round.create", { type: "Round", id: round._id }, { name, order });
    revalidatePath("/admin/rounds");
    revalidatePath("/admin/rubric"); // Rubric page needs to know rounds now exist
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function updateRoundStatus(
  roundId: string,
  newStatus: "draft" | "open" | "closed" | "published",
  prevState: any,
  formData: FormData
) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const round = await Round.findById(roundId);
    if (!round) return { error: "Round not found" };

    const previousStatus = round.status;
    round.status = newStatus;

    if (newStatus === "open") {
      round.scoresEditable = true;
      round.startsAt = round.startsAt || new Date();
    } else if (newStatus === "closed") {
      round.scoresEditable = false;
      round.endsAt = round.endsAt || new Date();
    }

    await round.save();

    await audit(
      actor,
      `round.${newStatus}`,
      { type: "Round", id: round._id },
      { from: previousStatus, to: newStatus },
    );
    revalidatePath("/admin/rounds");
    revalidatePath("/admin/rubric"); // Keep rubric in sync with round status changes
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}
