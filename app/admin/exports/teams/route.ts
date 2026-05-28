import dbConnect from "@/lib/dbConnect";
import { Team } from "@/models/Team";
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
  const teams = await Team.find({})
    .populate("ownerUserId", "firstName lastName email")
    .sort({ createdAt: 1 })
    .lean();

  const rows = teams.map((t: any) => [
    t._id.toString(),
    t.name,
    t.track,
    t.status,
    t.pitchTitle ?? "",
    t.pitchLink ?? "",
    t.ownerUserId ? `${t.ownerUserId.firstName} ${t.ownerUserId.lastName}` : "",
    t.ownerUserId?.email ?? "",
    (t.members ?? []).map((m: any) => m.name).join("; "),
    t.createdAt?.toISOString() ?? "",
  ]);

  const csv = toCsv(
    [
      "team_id",
      "name",
      "track",
      "status",
      "pitch_title",
      "pitch_link",
      "owner",
      "owner_email",
      "members",
      "created_at",
    ],
    rows,
  );

  return csvResponse(`teams-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
