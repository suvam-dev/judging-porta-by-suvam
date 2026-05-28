"use client";

import { useState } from "react";
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
    CheckCircle2
} from "lucide-react";

export default function LoginPage() {
    const [role, setRole] = useState<"judge" | "participant">("judge");
    const [identifier, setIdentifier] = useState(""); // Can be username or email
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ identifier?: string; password?: string; general?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!identifier.trim()) {
            newErrors.identifier = "Username or Email is required";
        } else if (identifier.includes("@") && !/\S+@\S+\.\S+/.test(identifier)) {
            newErrors.identifier = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
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
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to log in.");
            }

            setIsLoading(false);
            setIsSuccess(true);

            setTimeout(() => {
                window.location.href = `/${data.user.role}`;
            }, 1000);

        } catch (err: any) {
            setIsLoading(false);
            setErrors({ general: err.message || "Something went wrong during authentication." });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07070f] font-sans px-4">
            {/* Dynamic Background Mesh Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/40 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/30 blur-[130px] pointer-events-none animate-pulse duration-[10000ms]" />
            <div className="absolute top-[30%] right-[20%] w-[35%] h-[35%] rounded-full bg-violet-800/25 blur-[100px] pointer-events-none" />

            {/* Futuristic Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "24px 24px"
                }}
            />

            {/* Main Glass Container */}
            <div className="w-full max-w-lg relative z-10">

                {/* Glow behind the card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />

                <div className="backdrop-blur-xl bg-[#0d0d18]/70 border border-white/[0.08] shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-white/[0.12]">

                    {/* Logo / Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.4)] mb-4">
                            <Sparkles className="w-7 h-7 text-white animate-pulse" />
                            <div className="absolute inset-0 rounded-2xl border border-white/30 animate-ping opacity-25" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                            Welcome Back
                        </h1>
                        <p className="text-zinc-400 text-sm mt-2 max-w-xs">
                            Access the Judging Portal and manage your panel or tracks.
                        </p>
                    </div>

                    {isSuccess ? (
                        /* Premium Success Verification State */
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-4 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 className="w-9 h-9 animate-bounce" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Success!</h2>
                            <p className="text-zinc-400 text-sm mt-1">Sourcing authentic keys and redirecting...</p>
                            <div className="mt-6 flex items-center gap-2 text-indigo-400 font-medium text-xs tracking-wider uppercase animate-pulse">
                                <Loader2 className="w-4 h-4 animate-spin" /> Preparing workspace
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* General error message */}
                            {errors.general && (
                                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center animate-shake">
                                    {errors.general}
                                </div>
                            )}

                            {/* Role Selection Group */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                    Select Your Portal Role
                                </label>
                                <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#08080f]/90 border border-white/[0.05] rounded-2xl relative">

                                    {/* Judge Option */}
                                    <button
                                        type="button"
                                        onClick={() => setRole("judge")}
                                        className={`relative flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${role === "judge"
                                            ? "text-white bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] border border-transparent"
                                            }`}
                                    >
                                        <ShieldCheck className={`w-4 h-4 ${role === "judge" ? "text-indigo-400" : "text-zinc-500"}`} />
                                        Judge Portal
                                    </button>

                                    {/* Participant Option */}
                                    <button
                                        type="button"
                                        onClick={() => setRole("participant")}
                                        className={`relative flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${role === "participant"
                                            ? "text-white bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] border border-transparent"
                                            }`}
                                    >
                                        <Users className={`w-4 h-4 ${role === "participant" ? "text-purple-400" : "text-zinc-500"}`} />
                                        Participant
                                    </button>
                                </div>
                            </div>

                            {/* Username/Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                    Username or Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        {identifier.includes("@") ? (
                                            <Mail className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                        ) : (
                                            <User className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => {
                                            setIdentifier(e.target.value);
                                            if (errors.identifier) setErrors({ ...errors, identifier: undefined });
                                        }}
                                        placeholder="e.g. suvan@kgpian.org or judge_01"
                                        className={`w-full bg-[#08080f]/80 border ${errors.identifier
                                            ? "border-red-500/60 focus:ring-red-500/30 focus:border-red-500"
                                            : "border-white/[0.08] focus:border-indigo-500/80 focus:ring-indigo-500/20"
                                            } text-white rounded-2xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 placeholder-zinc-600`}
                                    />
                                </div>
                                {errors.identifier && (
                                    <p className="text-red-400 text-xs font-medium pl-1">{errors.identifier}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors({ ...errors, password: undefined });
                                        }}
                                        placeholder="••••••••"
                                        className={`w-full bg-[#08080f]/80 border ${errors.password
                                            ? "border-red-500/60 focus:ring-red-500/30 focus:border-red-500"
                                            : "border-white/[0.08] focus:border-indigo-500/80 focus:ring-indigo-500/20"
                                            } text-white rounded-2xl pl-11 pr-12 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 placeholder-zinc-600`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-xs font-medium pl-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full overflow-hidden group py-4 px-6 rounded-2xl text-white font-bold text-sm bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                                        Authenticating Security Keys...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Portal
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Sign Up Redirect */}
                            <div className="text-center mt-6 text-sm text-zinc-500">
                                Don&apos;t have a portal account?{" "}
                                <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Create one here
                                </a>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}