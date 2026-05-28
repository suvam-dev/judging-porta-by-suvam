import dbConnect from "@/lib/dbConnect";
import { Round } from "@/models/Round";
import { User } from "@/models/User";
import { Team } from "@/models/Team";
import { Assignment } from "@/models/Assignment";
import { assignJudgeToTeams, removeAssignment } from "./actions";
import { Link2, Trash2, Users } from "lucide-react";
import ActionForm from "@/components/ActionForm";
import ActionButton from "@/components/ActionButton";

export const metadata = {
  title: "Assignments | Empressario",
};

export default async function AssignmentsPage() {
  await dbConnect();
  
  const rounds = await Round.find({}).sort({ order: 1 });
  const judges = await User.find({ role: "judge" }).sort({ panelId: 1 });
  const teams = await Team.find({ status: "approved" }).sort({ name: 1 });
  
  const assignments = await Assignment.find({})
    .populate("roundId", "name")
    .populate("judgeId", "firstName lastName panelId")
    .populate("teamId", "name track")
    .sort({ createdAt: -1 });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Judge Assignments</h2>
        <p className="text-zinc-400 mt-2">
          Map judges to teams for specific scoring rounds.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Assignment Form */}
        <div className="xl:col-span-1">
          <div className="backdrop-blur-xl bg-[#0d0d18]/80 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                <Link2 className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Assign Teams</h3>
            </div>

            <ActionForm actionFn={assignJudgeToTeams}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Target Round</label>
                <select name="roundId" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2.5 text-sm focus:border-orange-500/80 outline-none transition-colors appearance-none">
                  {rounds.map(r => (
                    <option key={r._id.toString()} value={r._id.toString()}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Select Judge</label>
                <select name="judgeId" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2.5 text-sm focus:border-orange-500/80 outline-none transition-colors appearance-none">
                  {judges.map(j => (
                    <option key={j._id.toString()} value={j._id.toString()}>
                      Panel {j.panelId} - {j.firstName} {j.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">Select Teams to Assign</label>
                <div className="h-64 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                  {teams.length === 0 ? (
                    <div className="text-xs text-zinc-500 p-2 text-center">No approved teams available.</div>
                  ) : (
                    teams.map(t => (
                      <label key={t._id.toString()} className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                        <input type="checkbox" name="teamIds" value={t._id.toString()} className="w-4 h-4 rounded bg-black border-white/[0.1] text-orange-500 focus:ring-orange-500/50" />
                        <div>
                          <div className="font-bold text-sm text-white">{t.name}</div>
                          <div className="text-[10px] text-zinc-500 uppercase">{t.track}</div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-colors">
                Save Assignments
              </button>
            </ActionForm>
          </div>
        </div>

        {/* Existing Assignments Table */}
        <div className="xl:col-span-2">
          <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] h-full flex flex-col">
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <h3 className="font-semibold text-white">Active Assignments Map</h3>
              <div className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded-md">
                Total: {assignments.length}
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/40 text-zinc-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Round</th>
                    <th className="px-6 py-4 font-semibold">Judge</th>
                    <th className="px-6 py-4 font-semibold">Assigned Team</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {assignments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                        No assignments have been created.
                      </td>
                    </tr>
                  ) : (
                    assignments.map((assignment: any) => (
                      <tr key={assignment._id.toString()} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-white font-medium">
                          {assignment.roundId?.name || "Deleted Round"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded flex items-center justify-center bg-indigo-500/20 text-indigo-400 text-[10px] font-bold border border-indigo-500/30">
                              {assignment.judgeId?.panelId || "?"}
                            </span>
                            <span className="text-zinc-300">
                              {assignment.judgeId ? `${assignment.judgeId.firstName} ${assignment.judgeId.lastName}` : "Deleted Judge"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-zinc-500" />
                            <span className="text-white font-semibold">
                              {assignment.teamId?.name || "Deleted Team"}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                              {assignment.teamId?.track || ""}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionButton actionFn={removeAssignment.bind(null, assignment._id.toString())} className="text-zinc-500 hover:text-red-400 transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </ActionButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
