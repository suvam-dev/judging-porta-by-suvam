import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { Criterion } from "@/models/Criterion";
import { deleteCriterion } from "./actions";
import { FileCheck2, Plus, Trash2 } from "lucide-react";
import RubricForm from "./RubricForm";
import ActionButton from "@/components/ActionButton";

export const metadata = {
  title: "Configure Rubric | Empressario",
};

export default async function RubricPage() {
  await dbConnect();
  
  const rounds = await Round.find({}).sort({ order: 1 });
  
  // Group criteria by roundId
  const criteriaList = await Criterion.find({}).sort({ order: 1 });
  const criteriaByRound = criteriaList.reduce((acc, criteria) => {
    const rId = criteria.roundId.toString();
    if (!acc[rId]) acc[rId] = [];
    acc[rId].push(criteria);
    return acc;
  }, {} as Record<string, typeof criteriaList>);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Scoring Rubric</h2>
        <p className="text-zinc-400 mt-2">
          Define the scoring criteria (e.g. Innovation, Market Fit) for each round.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Criterion Form */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-[#0d0d18]/80 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <Plus className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Add Criterion</h3>
            </div>

            <RubricForm rounds={rounds.map(r => ({ _id: r._id.toString(), name: r.name }))} />
          </div>
        </div>

        {/* Existing Rubric List */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] h-full flex flex-col">
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
              <h3 className="font-semibold text-white">Configured Rubrics</h3>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar p-6 space-y-8">
              {rounds.length === 0 ? (
                <div className="text-center text-zinc-500 py-12">
                  No rounds or rubrics exist.
                </div>
              ) : (
                rounds.map((round) => {
                  const roundCriteria = criteriaByRound[round._id.toString()] || [];
                  
                  return (
                    <div key={round._id.toString()} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                          {round.order}
                        </div>
                        <h4 className="text-lg font-bold text-white">{round.name} Rubric</h4>
                      </div>

                      {roundCriteria.length === 0 ? (
                        <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] text-sm text-zinc-500">
                          No criteria defined for this round yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {roundCriteria.map(crit => (
                            <div key={crit._id.toString()} className="p-4 rounded-xl border border-white/[0.08] bg-[#08080f] relative group">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-xs text-green-400 font-semibold mb-1">#{crit.order}</div>
                                  <h5 className="font-bold text-white text-sm">{crit.name}</h5>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Out of</div>
                                  <div className="font-bold text-white">{crit.max} pts</div>
                                </div>
                              </div>
                              <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{crit.description || "No description provided."}</p>
                              
                              <div className="mt-3 pt-3 border-t border-white/[0.05] flex justify-between items-center">
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-zinc-400">
                                  Weight: {crit.weight}x
                                </span>
                                
                                <ActionButton actionFn={deleteCriterion.bind(null, crit._id.toString())} className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                  <Trash2 className="w-4 h-4" />
                                </ActionButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
