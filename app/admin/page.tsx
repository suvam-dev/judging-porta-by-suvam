import { getDashboardStats } from "./actions";
import { Users, ShieldCheck, Clock, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | Empressario",
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h2>
        <p className="text-zinc-400 mt-2">
          Monitor the competition's progress, pending approvals, and active rounds.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Participants Card */}
        <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-white/[0.12] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Teams</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stats.totalTeams}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 relative z-10">
            Registered participant accounts: <span className="text-zinc-300 font-medium">{stats.totalParticipants}</span>
          </p>
        </div>

        {/* Judges Card */}
        <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-white/[0.12] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-zinc-400">Active Judges</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stats.activeJudges}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 relative z-10">
            Total judge accounts: <span className="text-zinc-300 font-medium">{stats.totalJudges}</span>
          </p>
        </div>

        {/* Active Round Card */}
        <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-white/[0.12] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-zinc-400">Current Round</p>
              <h3 className="text-xl font-bold text-white mt-1 leading-tight">{stats.openRoundName}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 relative z-10">
            Scores are actively being recorded
          </p>
        </div>

        {/* Pending Approvals Card (Alert) */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-[#0d0d18]/80 to-amber-900/10 border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-amber-500/30 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-amber-200/80">Pending Approvals</p>
              <h3 className={`text-3xl font-bold mt-1 ${stats.pendingParticipants > 0 ? "text-amber-400" : "text-white"}`}>
                {stats.pendingParticipants}
              </h3>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stats.pendingParticipants > 0 ? "bg-amber-500/20 border-amber-500/30" : "bg-white/[0.05] border-white/10"}`}>
              <AlertCircle className={`w-5 h-5 ${stats.pendingParticipants > 0 ? "text-amber-400" : "text-zinc-500"}`} />
            </div>
          </div>
          <p className="text-xs text-amber-200/60 relative z-10">
            Participants waiting for access
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/teams" className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-medium text-sm text-zinc-300 group-hover:text-white transition-colors">Manage Teams</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>
          
          <Link href="/admin/judges" className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              </div>
              <span className="font-medium text-sm text-zinc-300 group-hover:text-white transition-colors">Provision Judges</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/admin/rounds" className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-medium text-sm text-zinc-300 group-hover:text-white transition-colors">Configure Rounds</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
