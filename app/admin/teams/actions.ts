"use server";

import dbConnect from "@/lib/dbConnect";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { requireAdmin, audit } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

export async function approveTeam(teamId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const team = await Team.findById(teamId);
    if (!team) return { error: "Team not found" };

    team.status = "approved";
    await team.save();

    const user = await User.findById(team.ownerUserId);
    if (user) {
      user.status = "active";
      await user.save();
    }

    await audit(actor, "team.approve", { type: "Team", id: team._id });
    revalidatePath("/admin/teams");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function rejectTeam(teamId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const team = await Team.findById(teamId);
    if (!team) return { error: "Team not found" };

    team.status = "rejected";
    await team.save();

    const user = await User.findById(team.ownerUserId);
    if (user) {
      user.status = "disabled";
      await user.save();
    }

    await audit(actor, "team.reject", { type: "Team", id: team._id });
    revalidatePath("/admin/teams");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}
