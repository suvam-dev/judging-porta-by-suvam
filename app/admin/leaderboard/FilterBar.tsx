"use client";

import { useRouter, useSearchParams } from "next/navigation";

type RoundOption = { id: string; name: string; status: string };

export default function FilterBar({
  rounds,
  selectedRoundId,
  selectedTrack,
}: {
  rounds: RoundOption[];
  selectedRoundId: string | undefined;
  selectedTrack: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: "round" | "track", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/admin/leaderboard?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/[0.05]">
      <select
        name="round"
        defaultValue={selectedRoundId}
        onChange={(e) => update("round", e.currentTarget.value)}
        className="bg-[#0d0d18] border border-white/[0.08] text-white rounded-xl px-4 py-2 text-sm focus:border-yellow-500/80 outline-none appearance-none"
      >
        {rounds.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name} {r.status === "open" ? "(Live)" : ""}
          </option>
        ))}
      </select>

      <select
        name="track"
        defaultValue={selectedTrack}
        onChange={(e) => update("track", e.currentTarget.value)}
        className="bg-[#0d0d18] border border-white/[0.08] text-white rounded-xl px-4 py-2 text-sm focus:border-yellow-500/80 outline-none appearance-none"
      >
        <option value="All">All Tracks</option>
        <option value="PnS">Product & Services</option>
        <option value="Social">Social</option>
        <option value="KGP">IIT KGP</option>
      </select>
    </div>
  );
}
