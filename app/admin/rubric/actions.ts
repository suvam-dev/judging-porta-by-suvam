"use server";

import dbConnect from "@/lib/dbConnect";
import { Criterion } from "@/models/Criterion";
import { requireAdmin, audit } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

export async function createCriterion(prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const roundId = formData.get("roundId") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const weightStr = formData.get("weight") as string;
    const maxStr = formData.get("max") as string;
    const orderStr = formData.get("order") as string;

    if (!roundId || !name || !weightStr || !maxStr || !orderStr) {
      return { error: "All fields are required." };
    }

    const weight = parseFloat(weightStr);
    const max = parseInt(maxStr, 10);
    const order = parseInt(orderStr, 10);

    const existing = await Criterion.findOne({ roundId, order });
    if (existing) {
      return { error: `A criterion with order ${order} already exists for this round. Please choose a different order number.` };
    }

  const criterion = await Criterion.create({
    roundId,
    name,
    description,
    weight,
    max,
    order,
  });

    await audit(
      actor,
      "criterion.create",
      { type: "Criterion", id: criterion._id },
      { roundId, name, weight, max },
    );
    revalidatePath("/admin/rubric");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function deleteCriterion(criterionId: string, prevState: any, formData: FormData) {
  try {
    const actor = await requireAdmin();
    await dbConnect();

    const criterion = await Criterion.findByIdAndDelete(criterionId);
    if (!criterion) return { error: "Criterion not found" };

    await audit(actor, "criterion.delete", { type: "Criterion", id: criterion._id });
    revalidatePath("/admin/rubric");
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}
