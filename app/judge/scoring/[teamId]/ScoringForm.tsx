"use client";

import { useActionState, useEffect, useState } from "react";
import { submitScores } from "../../actions";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

type CriterionType = {
  _id: string;
  name: string;
  description: string;
  max: number;
  weight: number;
  order: number;
};

type ScoreType = {
  criterionId: string;
  value: number;
  comment: string | null;
};

export default function ScoringForm({
  teamId,
  roundId,
  criteria,
  existingScores,
}: {
  teamId: string;
  roundId: string;
  criteria: CriterionType[];
  existingScores: ScoreType[];
}) {
  const [state, action, isPending] = useActionState(submitScores, { error: null });
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // If action is successful, show a brief success message and redirect
  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        router.push("/judge");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Scores Saved Successfully</h3>
        <p className="text-zinc-400">Redirecting you to the dashboard...</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state.error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl">
          {state.error}
        </div>
      )}

      <input type="hidden" name="teamId" value={teamId} />
      <input type="hidden" name="roundId" value={roundId} />

      <div className="space-y-6">
        {criteria.map((crit) => {
          const existing = existingScores.find((s) => s.criterionId === crit._id);
          
          return (
            <div key={crit._id} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-400">#{crit.order}</span>
                    <h4 className="text-lg font-bold text-white">{crit.name}</h4>
                  </div>
                  <p className="text-sm text-zinc-400">{crit.description}</p>
                </div>
                
                <div className="sm:text-right shrink-0">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Score (0-{crit.max})</div>
                  <input
                    type="number"
                    name={`score_${crit._id}`}
                    min="0"
                    max={crit.max}
                    step="0.1"
                    defaultValue={existing?.value}
                    required
                    className="w-full sm:w-24 bg-black/40 border border-white/[0.1] text-white rounded-lg px-3 py-2 text-center text-lg font-bold focus:border-indigo-500 focus:bg-black/60 outline-none transition-all shadow-inner placeholder:text-zinc-700"
                    placeholder={`/${crit.max}`}
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name={`comment_${crit._id}`}
                  defaultValue={existing?.comment || ""}
                  placeholder="Optional comment for this criterion..."
                  className="w-full bg-black/20 border border-white/[0.05] text-white rounded-lg px-3 py-2 text-sm focus:border-indigo-500/50 outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/[0.08]">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
        >
          {isPending ? "Saving Scores..." : existingScores.length > 0 ? "Update Scores" : "Submit Scores"}
        </button>
      </div>
    </form>
  );
}
