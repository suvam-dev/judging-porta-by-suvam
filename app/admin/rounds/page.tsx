import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { createRound, updateRoundStatus } from "./actions";
import { Clock, Plus, PlayCircle, StopCircle, Eye } from "lucide-react";
import ActionForm from "@/components/ActionForm";
import ActionButton from "@/components/ActionButton";

export const metadata = {
  title: "Configure Rounds | Empressario",
};

export default async function RoundsPage() {
  await dbConnect();
  
  const rounds = await Round.find({}).sort({ order: 1 });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Configure Rounds</h2>
        <p className="text-zinc-400 mt-2">
          Create scoring rounds (e.g. Semi-Finals, Finals) and control when they open and close.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Round Form */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-[#0d0d18]/80 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Plus className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Create Round</h3>
            </div>

            <ActionForm actionFn={createRound}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Round Name</label>
                <input name="name" type="text" placeholder="e.g., Semi-Finals" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-blue-500/80 outline-none transition-colors" />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Chronological Order</label>
                <input name="order" type="number" min="1" placeholder="1" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-blue-500/80 outline-none transition-colors" />
                <p className="text-[10px] text-zinc-500 mt-1">Controls the sequence of the competition.</p>
              </div>

              <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                Add Round
              </button>
            </ActionForm>
          </div>
        </div>

        {/* Existing Rounds List */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] h-full flex flex-col">
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
              <h3 className="font-semibold text-white">Timeline</h3>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-4">
              {rounds.length === 0 ? (
                <div className="text-center text-zinc-500 py-12">
                  No rounds have been configured.
                </div>
              ) : (
                rounds.map((round) => (
                  <div key={round._id.toString()} className={`p-5 rounded-xl border ${round.status === 'open' ? 'bg-blue-500/5 border-blue-500/30' : 'bg-white/[0.02] border-white/[0.05]'} flex items-center justify-between transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${round.status === 'open' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-black/40 text-zinc-500 border border-white/[0.1]'}`}>
                        {round.order}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{round.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {round.status === "draft" && <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-zinc-500/20 text-zinc-400">Draft</span>}
                          {round.status === "open" && <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-green-500/20 text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Live Now</span>}
                          {round.status === "closed" && <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-400">Closed</span>}
                          {round.status === "published" && <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-purple-500/20 text-purple-400">Results Published</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {round.status === "draft" && (
                        <ActionButton actionFn={updateRoundStatus.bind(null, round._id.toString(), "open")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium text-xs transition-colors">
                          <PlayCircle className="w-4 h-4" /> Start Round
                        </ActionButton>
                      )}
                      
                      {round.status === "open" && (
                        <ActionButton actionFn={updateRoundStatus.bind(null, round._id.toString(), "closed")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium text-xs transition-colors">
                          <StopCircle className="w-4 h-4" /> Close Round
                        </ActionButton>
                      )}

                      {round.status === "closed" && (
                        <ActionButton actionFn={updateRoundStatus.bind(null, round._id.toString(), "published")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 font-medium text-xs transition-colors">
                          <Eye className="w-4 h-4" /> Publish Results
                        </ActionButton>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
