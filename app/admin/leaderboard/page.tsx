import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { calculateLeaderboard } from "@/lib/scoring";
import { Trophy } from "lucide-react";
import FilterBar from "./FilterBar";

export const metadata = {
  title: "Live Leaderboard | Empressario",
};

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ round?: string; track?: string }>;
}) {
  await dbConnect();

  const { round: roundParam, track: trackParam } = await searchParams;

  const rounds = await Round.find({}).sort({ order: 1 });
  const openRound = rounds.find((r) => r.status === "open");
  const selectedRoundId =
    roundParam || (openRound ? openRound._id.toString() : rounds[0]?._id.toString());

  const selectedTrack = trackParam || "All";

  let leaderboard = selectedRoundId ? await calculateLeaderboard(selectedRoundId) : [];

  if (selectedTrack !== "All") {
    leaderboard = leaderboard.filter((entry) => entry.track === selectedTrack);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" /> Live Leaderboard
          </h2>
          <p className="text-zinc-400 mt-2">
            Real-time algorithmically weighted scores.
          </p>
        </div>

        <FilterBar
          rounds={rounds.map((r) => ({
            id: r._id.toString(),
            name: r.name,
            status: r.status,
          }))}
          selectedRoundId={selectedRoundId}
          selectedTrack={selectedTrack}
        />
      </div>

      {/* Leaderboard Table */}
      <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/60 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-5 font-semibold w-24">Rank</th>
                <th className="px-6 py-5 font-semibold">Project Name</th>
                <th className="px-6 py-5 font-semibold">Track</th>
                <th className="px-6 py-5 font-semibold text-center">Judges Scored</th>
                <th className="px-6 py-5 font-semibold text-right">Weighted Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-zinc-500">
                    No scores recorded for this round yet.
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.teamId} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      {index === 0 && <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]">1</div>}
                      {index === 1 && <div className="w-8 h-8 rounded-full bg-zinc-300/20 text-zinc-300 flex items-center justify-center font-bold border border-zinc-300/50">2</div>}
                      {index === 2 && <div className="w-8 h-8 rounded-full bg-orange-700/30 text-orange-400 flex items-center justify-center font-bold border border-orange-700/50">3</div>}
                      {index > 2 && <div className="w-8 h-8 text-zinc-500 flex items-center justify-center font-bold">{index + 1}</div>}
                    </td>
                    <td className="px-6 py-5 text-white font-bold text-base">
                      {entry.teamName}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/10">
                        {entry.track}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center justify-center">
                        <span className={`font-medium ${entry.judgesScored === entry.totalJudgesAssigned ? 'text-green-400' : 'text-amber-400'}`}>
                          {entry.judgesScored}
                        </span>
                        <span className="text-zinc-500 mx-1">/</span>
                        <span className="text-zinc-500">{entry.totalJudgesAssigned}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="text-2xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-yellow-200 transition-all">
                        {entry.finalScore.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
