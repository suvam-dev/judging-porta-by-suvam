import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Round } from "@/models/Round";
import { Assignment } from "@/models/Assignment";
import { Team } from "@/models/Team";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, ShieldAlert, Clock, ArrowRight, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Judge Dashboard | Empressario",
};

export default async function JudgeDashboard() {
  const session = await getSession();
  if (!session || session.role !== "judge") {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(session.userId);
  if (!user) {
    redirect("/login");
  }

  // If judge is pending approval
  if (user.status === "pending") {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center text-white p-6">
        <div className="max-w-md text-center bg-[#0d0d18] border border-white/[0.08] p-8 rounded-3xl">
          <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pending Approval</h1>
          <p className="text-zinc-400">Your judge account is currently under review by the administrators. You will be able to access the judging portal once approved.</p>
        </div>
      </div>
    );
  }

  if (user.status === "disabled") {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center text-white p-6">
        <div className="max-w-md text-center bg-[#0d0d18] border border-white/[0.08] p-8 rounded-3xl">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Revoked</h1>
          <p className="text-zinc-400">Your judge account has been disabled. Please contact the organizers.</p>
        </div>
      </div>
    );
  }

  // Fetch the currently active round
  const openRound = await Round.findOne({ status: "open" });

  // Fetch assignments for this judge
  let assignedTeams: any[] = [];
  if (openRound) {
    const assignments = await Assignment.find({ 
      judgeId: session.userId, 
      roundId: openRound._id 
    }).populate("teamId");
    
    assignedTeams = assignments.map(a => a.teamId).filter(Boolean);
  }

  return (
    <div className="min-h-screen bg-[#07070f] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-sm">Judge Panel</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Welcome, Judge {user.lastName}
            </h1>
          </div>
          
          <div className="bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.08] px-5 py-3 rounded-2xl">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Current Round</div>
            {openRound ? (
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {openRound.name}
              </div>
            ) : (
              <div className="text-zinc-400 font-bold">No Active Round</div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {!openRound ? (
          <div className="bg-[#0d0d18] border border-white/[0.08] rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <ClipboardCheck className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Competition Paused</h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              There is no active round right now. Please wait for the administrators to open the next round before scoring.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Your Assigned Teams</h3>
            
            {assignedTeams.length === 0 ? (
              <div className="bg-[#0d0d18] border border-white/[0.08] rounded-3xl p-12 text-center">
                <p className="text-zinc-400">You have no teams assigned to you for the {openRound.name}.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedTeams.map((team) => (
                  <div key={team._id.toString()} className="bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors group flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/10">
                          {team.track} Track
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{team.name}</h4>
                      <p className="text-sm text-zinc-400 line-clamp-2">{team.summary}</p>
                    </div>
                    
                    <Link 
                      href={`/judge/scoring/${team._id.toString()}`}
                      className="p-4 bg-indigo-600/10 hover:bg-indigo-600/20 border-t border-indigo-500/20 flex justify-between items-center text-indigo-400 font-semibold text-sm transition-colors"
                    >
                      Score this Team
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
