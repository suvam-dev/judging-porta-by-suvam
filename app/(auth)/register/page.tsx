"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileCode,
  FolderGit2,
  Link2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"judge" | "participant">("participant");
  
  // Registration Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Role-specific fields
  const [panelId, setPanelId] = useState(""); // For judges
  const [track, setTrack] = useState("PnS"); // For participants
  const [projectName, setProjectName] = useState("");
  const [pptLink, setPptLink] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (role === "judge" && !panelId.trim()) {
      newErrors.panelId = "Panel ID is required for judges";
    }

    if (role === "participant") {
      if (!projectName.trim()) newErrors.projectName = "Project name is required";
      if (pptLink && !/^https?:\/\/.+/i.test(pptLink)) {
        newErrors.pptLink = "PPT Link must start with http:// or https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          role,
          panelId: role === "judge" ? parseInt(panelId) : undefined,
          track: role === "participant" ? track : undefined,
          projectName: role === "participant" ? projectName : undefined,
          pptLink: role === "participant" ? pptLink : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setIsLoading(false);
      setErrors({ general: err.message || "Something went wrong." });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-y-auto bg-[#07070f] font-sans px-4 py-12">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/25 blur-[120px] pointer-events-none" />

      {/* Futuristic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Main Glass Container */}
      <div className="w-full max-w-xl relative z-10">
        
        {/* Glow behind the card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />

        <div className="backdrop-blur-xl bg-[#0d0d18]/70 border border-white/[0.08] shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-white/[0.12]">
          
          {/* Logo / Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Create Portal Account
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Join the Judging Portal as a Judge or Participant
            </p>
          </div>

          {errors.general && (
            <div className="p-3.5 mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
              {errors.general}
            </div>
          )}

          {isSuccess ? (
            /* Premium Success State */
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-4 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>
              <h2 className="text-xl font-bold text-white">Registered Successfully!</h2>
              <p className="text-zinc-400 text-xs mt-1">Initializing your credentials and redirecting to login...</p>
              <div className="mt-6 flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
                <Loader2 className="w-4 h-4 animate-spin" /> Moving to gateway
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Selection Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                  Choose Account Type
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#08080f]/90 border border-white/[0.05] rounded-xl relative">
                  
                  {/* Participant Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setRole("participant");
                      setErrors({});
                    }}
                    className={`relative flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      role === "participant" 
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <Users className={`w-3.5 h-3.5 ${role === "participant" ? "text-purple-400" : "text-zinc-500"}`} />
                    Participant
                  </button>

                  {/* Judge Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setRole("judge");
                      setErrors({});
                    }}
                    className={`relative flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      role === "judge" 
                        ? "text-white bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <ShieldCheck className={`w-3.5 h-3.5 ${role === "judge" ? "text-indigo-400" : "text-zinc-500"}`} />
                    Judge Portal
                  </button>
                </div>
              </div>

              {/* Name Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="e.g. Suvan"
                  />
                  {errors.firstName && <p className="text-red-400 text-[10px] font-medium">{errors.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="e.g. Ghosh"
                  />
                  {errors.lastName && <p className="text-red-400 text-[10px] font-medium">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email & Username */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="e.g. suvan_dev"
                  />
                  {errors.username && <p className="text-red-400 text-[10px] font-medium">{errors.username}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="e.g. user@domain.com"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-medium">{errors.email}</p>}
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-400 text-[10px] font-medium">{errors.password}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-[10px] font-medium">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Conditional Form Fields */}
              {role === "judge" ? (
                /* Judge Fields */
                <div className="space-y-3.5 p-4 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/10">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Judge Panel Information</span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Assigned Panel ID</label>
                    <input
                      type="number"
                      value={panelId}
                      onChange={(e) => setPanelId(e.target.value)}
                      className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/25 outline-none transition-all placeholder-zinc-600"
                      placeholder="e.g. 101"
                    />
                    {errors.panelId && <p className="text-red-400 text-[10px] font-medium">{errors.panelId}</p>}
                  </div>
                </div>
              ) : (
                /* Participant Fields */
                <div className="space-y-3.5 p-4 rounded-2xl bg-purple-500/[0.03] border border-purple-500/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Startup Pitch Details</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Project / Startup Name</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/25 outline-none transition-all placeholder-zinc-600"
                        placeholder="e.g. TechSol Ltd"
                      />
                      {errors.projectName && <p className="text-red-400 text-[10px] font-medium">{errors.projectName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Track Category</label>
                      <select
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        className="w-full bg-[#08080f]/80 border border-white/[0.08] text-zinc-300 rounded-xl px-4 py-2.5 text-xs focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/25 outline-none transition-all"
                      >
                        <option value="PnS" className="bg-[#0c0c14] text-white">Product & Services</option>
                        <option value="Social" className="bg-[#0c0c14] text-white">Social Entrepreneurship</option>
                        <option value="KGP" className="bg-[#0c0c14] text-white">IIT KGP Innovation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                      Pitch Deck PPT Link <span className="text-[10px] text-zinc-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link2 className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                      <input
                        type="url"
                        value={pptLink}
                        onChange={(e) => setPptLink(e.target.value)}
                        className="w-full bg-[#08080f]/80 border border-white/[0.08] text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/25 outline-none transition-all placeholder-zinc-600"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                    {errors.pptLink && <p className="text-red-400 text-[10px] font-medium">{errors.pptLink}</p>}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full overflow-hidden group py-3.5 px-6 rounded-xl text-white font-bold text-xs bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Deploying Security Keyring...
                  </>
                ) : (
                  <>
                    Create Account & Settle
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Link to Login */}
              <div className="text-center mt-4 text-xs text-zinc-500">
                Already registered?{" "}
                <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Login here
                </a>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
