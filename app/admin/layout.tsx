"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Clock,
  FileCheck2,
  Link as LinkIcon,
  Trophy,
  Download,
  LogOut,
  Sparkles
} from "lucide-react";
import { logoutAdmin } from "./actions";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Teams", href: "/admin/teams", icon: Users },
  { name: "Judges", href: "/admin/judges", icon: ShieldCheck },
  { name: "Rounds", href: "/admin/rounds", icon: Clock },
  { name: "Rubric", href: "/admin/rubric", icon: FileCheck2 },
  { name: "Assignments", href: "/admin/assignments", icon: LinkIcon },
  { name: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
  { name: "Exports", href: "/admin/exports", icon: Download },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#07070f] text-white overflow-hidden font-sans">
      
      {/* Premium Sidebar */}
      <aside className="w-72 relative flex flex-col border-r border-white/[0.08] bg-[#0d0d18]/50 backdrop-blur-2xl">
        {/* Glow behind the sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none -z-10" />
        
        {/* Logo Section */}
        <div className="p-8 flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Empressario
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
              Control Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-6">
          <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 mt-2">
            Management
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? "text-white bg-white/[0.06] border border-white/[0.08] shadow-[0_0_15px_rgba(255,255,255,0.02)]" 
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                )}
                <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-400" : "group-hover:text-zinc-300"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User profile / Logout */}
        <div className="p-4 border-t border-white/[0.08]">
          <form action={logoutAdmin}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Dynamic Background Mesh for the content area */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/5 blur-[130px] pointer-events-none" />
        
        <div className="min-h-full p-8 md:p-12 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
