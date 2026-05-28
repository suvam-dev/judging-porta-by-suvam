import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { requireAdmin, AuthError } from "@/lib/adminAuth";
import { toCsv, csvResponse } from "@/lib/csv";

export async function GET() {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return new Response(err.message, { status: err.status });
    }
    throw err;
  }

  await dbConnect();
  const judges = await User.find({ role: "judge" })
    .sort({ panelId: 1, lastName: 1 })
    .lean();

  const rows = judges.map((j: any) => [
    j._id.toString(),
    j.username,
    `${j.firstName} ${j.lastName}`,
    j.email,
    j.panelId ?? "",
    j.status,
    j.lastLoginAt?.toISOString() ?? "",
    j.createdAt?.toISOString() ?? "",
  ]);

  const csv = toCsv(
    ["judge_id", "username", "name", "email", "panel", "status", "last_login_at", "created_at"],
    rows,
  );

  return csvResponse(`judges-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
