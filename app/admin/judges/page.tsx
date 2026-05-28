import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { createJudge, disableJudge, approveJudge, rejectJudge } from "./actions";
import { ShieldCheck, UserPlus, Ban, Lock, CheckCircle2, XCircle } from "lucide-react";
import ActionForm from "@/components/ActionForm";
import ActionButton from "@/components/ActionButton";

export const metadata = {
  title: "Provision Judges | Empressario",
};

export default async function JudgesPage() {
  await dbConnect();
  
  const activeJudges = await User.find({ role: "judge", status: { $ne: "pending" } }).sort({ createdAt: -1 });
  const pendingJudges = await User.find({ role: "judge", status: "pending" }).sort({ createdAt: 1 });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Provision Judges</h2>
        <p className="text-zinc-400 mt-2">
          Create and manage accounts for competition judges. Only admins can create judge accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Judge Form */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-[#0d0d18]/80 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <UserPlus className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">New Judge Account</h3>
            </div>

            <ActionForm actionFn={createJudge}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">First Name</label>
                  <input name="firstName" type="text" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Last Name</label>
                  <input name="lastName" type="text" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Username</label>
                <input name="username" type="text" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Email Address</label>
                <input name="email" type="email" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Panel Number</label>
                <input name="panelId" type="number" min="1" required placeholder="e.g. 1" className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl px-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
                <p className="text-[10px] text-zinc-500 mt-1">Used to group judges for assignment.</p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">Temporary Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="password" type="text" required className="w-full bg-black/20 border border-white/[0.08] text-white rounded-xl pl-9 pr-3 py-2 text-sm focus:border-purple-500/80 outline-none transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-colors">
                Provision Account
              </button>
            </ActionForm>
          </div>
        </div>

        {/* Pending Judges & Active Panel */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pending Judges List */}
          {pendingJudges.length > 0 && (
            <div className="backdrop-blur-xl bg-orange-900/10 border border-orange-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <div className="p-4 border-b border-orange-500/20 bg-orange-500/5">
                <h3 className="font-semibold text-orange-400">Pending Judge Registrations</h3>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-black/40 text-orange-500/70">
                    <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">Judge Name</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                      <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-500/10">
                    {pendingJudges.map((judge) => (
                      <tr key={judge._id.toString()} className="hover:bg-orange-500/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                              <ShieldCheck className="w-4 h-4 text-orange-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white">{judge.firstName} {judge.lastName}</div>
                              <div className="text-xs text-zinc-500">@{judge.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                          {judge.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton actionFn={approveJudge.bind(null, judge._id.toString())} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium text-xs transition-colors border border-green-500/30" title="Approve">
                              <CheckCircle2 className="w-4 h-4" /> Approve
                            </ActionButton>
                            <ActionButton actionFn={rejectJudge.bind(null, judge._id.toString())} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/30" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </ActionButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Active Panel */}
          <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] h-full flex flex-col">
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
              <h3 className="font-semibold text-white">Active Panel</h3>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-black/40 text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Judge Name</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {activeJudges.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                        No active judges on the panel.
                      </td>
                    </tr>
                  ) : (
                    activeJudges.map((judge) => (
                      <tr key={judge._id.toString()} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                              <ShieldCheck className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white">{judge.firstName} {judge.lastName}</div>
                              <div className="text-xs text-zinc-500">@{judge.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                          {judge.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {judge.status === "active" ? (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
                          ) : (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">Disabled</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {judge.status === "active" && (
                            <ActionButton actionFn={disableJudge.bind(null, judge._id.toString())} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/30" title="Revoke Access">
                              <Ban className="w-4 h-4" />
                            </ActionButton>
                          )}
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
