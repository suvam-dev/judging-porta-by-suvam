import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Round } from "@/models/Round";
import { Team } from "@/models/Team";
import { Criterion } from "@/models/Criterion";
import { Score } from "@/models/Score";
import { Assignment } from "@/models/Assignment";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChevronLeft, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ScoringForm from "./ScoringForm";

export default async function ScoringPage({ params }: { params: Promise<{ teamId: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "judge") {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(session.userId);
  if (!user || user.status !== "active") {
    redirect("/judge");
  }

  const { teamId } = await params;

  const team = await Team.findById(teamId);
  if (!team) {
    return <div className="text-white text-center mt-20">Team not found</div>;
  }

  const openRound = await Round.findOne({ status: "open" });
  if (!openRound) {
    return <div className="text-white text-center mt-20">No active round. Scoring is closed.</div>;
  }

  const assignment = await Assignment.findOne({
    judgeId: session.userId,
    teamId: team._id,
    roundId: openRound._id,
  });

  if (!assignment) {
    return <div className="text-white text-center mt-20">You are not assigned to this team.</div>;
  }

  // Fetch Rubric
  const criteria = await Criterion.find({ roundId: openRound._id }).sort({ order: 1 });

  // Fetch Existing Scores for this Judge/Team/Round
  const existingScores = await Score.find({
    judgeId: session.userId,
    teamId: team._id,
    roundId: openRound._id,
  });

  return (
    <div className="min-h-screen bg-[#07070f] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div>
          <Link href="/judge" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/10">
                  {team.track} Track
                </span>
                <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20">
                  {openRound.name}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
                {team.name}
              </h1>
              <p className="text-zinc-400 max-w-2xl">{team.summary}</p>
            </div>
            
            {team.pitchLink && (
              <a 
                href={team.pitchLink.startsWith('http') ? team.pitchLink : `https://${team.pitchLink}`}
                target="_blank" 
                rel="noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all whitespace-nowrap"
              >
                View Pitch Deck
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Scoring Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Details Sidebar */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-[#0d0d18]/80 border border-white/[0.08] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <h3 className="font-bold text-white mb-4">Team Members</h3>
              <ul className="space-y-3">
                {team.members.map((m: any, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-bold text-zinc-400">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{m.name}</div>
                      {m.email && <div className="text-zinc-500 text-xs">{m.email}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scoring Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-[#0d0d18] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Scorecard</h2>
              </div>
              
              {criteria.length === 0 ? (
                <div className="text-center text-zinc-500 py-12 border border-white/[0.05] rounded-xl bg-white/[0.02]">
                  The administrator has not configured a rubric for this round yet.
                </div>
              ) : (
                <ScoringForm 
                  teamId={team._id.toString()} 
                  roundId={openRound._id.toString()} 
                  criteria={criteria.map(c => ({
                    _id: c._id.toString(),
                    name: c.name,
                    description: c.description || "",
                    max: c.max,
                    weight: c.weight,
                    order: c.order,
                  }))}
                  existingScores={existingScores.map(s => ({
                    criterionId: s.criterionId.toString(),
                    value: s.value,
                    comment: s.comment,
                  }))}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
