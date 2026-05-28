"use server";

import dbConnect from "@/lib/dbConnect";
import { Assignment } from "@/models/Assignment";
import { requireAdmin, audit } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

export async function assignJudgeToTeams(prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const roundId = formData.get("roundId") as string;
    const judgeId = formData.get("judgeId") as string;
    const teamIds = formData.getAll("teamIds") as string[];

    if (!roundId || !judgeId || teamIds.length === 0) {
      return { error: "Round, Judge, and at least one Team are required." };
    }

    const existing = await Assignment.find({ roundId, judgeId });
    const existingTeamIds = existing.map((a) => a.teamId.toString());
    const newTeamIds = teamIds.filter((id) => !existingTeamIds.includes(id));

    if (newTeamIds.length > 0) {
      await Assignment.insertMany(
        newTeamIds.map((teamId) => ({ roundId, judgeId, teamId })),
      );
      await audit(actor, "assignment.create", { type: "User", id: judgeId }, {
        roundId,
        judgeId,
        teamIds: newTeamIds,
      });
    }

    revalidatePath("/admin/assignments");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function removeAssignment(assignmentId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const assignment = await Assignment.findByIdAndDelete(assignmentId);
    if (!assignment) return { error: "Assignment not found" };

    await audit(actor, "assignment.delete", { type: "Assignment", id: assignment._id }, {
      roundId: assignment.roundId.toString(),
      judgeId: assignment.judgeId.toString(),
      teamId: assignment.teamId.toString(),
    });
    revalidatePath("/admin/assignments");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}
