import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { calculateLeaderboard } from "@/lib/scoring";
import { requireAdmin, AuthError } from "@/lib/adminAuth";
import { toCsv, csvResponse } from "@/lib/csv";

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return new Response(err.message, { status: err.status });
    }
    throw err;
  }

  await dbConnect();

  const url = new URL(req.url);
  const roundParam = url.searchParams.get("round");

  let roundId = roundParam;
  let roundName = "all-rounds";
  if (!roundId) {
    const round = (await Round.findOne({ status: "open" })) ?? (await Round.findOne({}).sort({ order: -1 }));
    if (!round) {
      return new Response("No rounds configured", { status: 404 });
    }
    roundId = round._id.toString();
    roundName = round.name;
  } else {
    const round = await Round.findById(roundId);
    if (!round) {
      return new Response("Round not found", { status: 404 });
    }
    roundName = round.name;
  }

  const leaderboard = await calculateLeaderboard(roundId);

  const rows = leaderboard.map((entry, index) => [
    index + 1,
    entry.teamName,
    entry.track,
    entry.judgesScored,
    entry.totalJudgesAssigned,
    entry.finalScore,
  ]);

  const csv = toCsv(
    ["rank", "team", "track", "judges_scored", "judges_assigned", "weighted_score"],
    rows,
  );

  const slug = roundName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return csvResponse(`leaderboard-${slug}-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
