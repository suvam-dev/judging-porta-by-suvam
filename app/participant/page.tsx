import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Team } from "@/models/Team";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShieldAlert, CheckCircle, Clock, Link as LinkIcon, Users, Rocket } from "lucide-react";

export const metadata = {
  title: "Participant Portal | Empressario",
};

export default async function ParticipantPage() {
  const session = await getSession();
  if (!session || session.role !== "participant") {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(session.userId);
  const team = await Team.findOne({ ownerUserId: session.userId });

  if (!user || !team) {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center text-white p-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Account Error</h1>
          <p className="text-zinc-400">We could not find your team registration data. Please contact an administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070f] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Welcome, {user.firstName}
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Startup Pitch Portal
            </p>
          </div>
          
          <div className="bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.08] px-5 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Status:</span>
            {team.status === "pending" && (
              <span className="flex items-center gap-2 text-amber-400 font-bold bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
                <Clock className="w-4 h-4" /> Under Review
              </span>
            )}
            {team.status === "approved" && (
              <span className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 px-3 py-1.5 rounded-lg border border-green-400/20">
                <CheckCircle className="w-4 h-4" /> Approved
              </span>
            )}
            {team.status === "rejected" && (
              <span className="flex items-center gap-2 text-red-400 font-bold bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                <ShieldAlert className="w-4 h-4" /> Rejected
              </span>
            )}
          </div>
        </div>

        {/* Status Banner */}
        {team.status === "pending" && (
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-6 flex gap-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-500">Your registration is being reviewed</h3>
              <p className="text-amber-500/80 mt-1 text-sm">
                The organizing committee is currently reviewing your pitch submission. You will be fully admitted into the portal once an admin approves your team. Sit tight!
              </p>
            </div>
          </div>
        )}

        {/* Team Details Card */}
        <div className="backdrop-blur-xl bg-[#0d0d18]/60 border border-white/[0.08] shadow-[0_0_50px_rgba(168,85,247,0.05)] rounded-3xl p-8 transition-all hover:border-white/[0.12]">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.08]">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{team.name}</h2>
              <div className="text-sm text-purple-400 font-semibold tracking-wider uppercase mt-1">
                {team.track} Track
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Registered Members
                </h4>
                <div className="space-y-3">
                  {team.members.map((member: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{member.name}</div>
                        <div className="text-xs text-zinc-500">{member.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Pitch Materials
                </h4>
                {team.pitchLink ? (
                  <a 
                    href={team.pitchLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors group"
                  >
                    <div className="text-blue-400 font-bold mb-1 flex items-center justify-between">
                      View Pitch Deck
                      <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <div className="text-xs text-blue-400/60 truncate">{team.pitchLink}</div>
                  </a>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm text-zinc-500 italic">
                    No pitch deck link provided during registration.
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Project Summary
                </h4>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm text-zinc-400 leading-relaxed">
                  {team.summary}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
