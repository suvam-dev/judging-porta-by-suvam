"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

export default function ActionForm({ 
  actionFn, 
  children, 
  className = "space-y-4" 
}: { 
  actionFn: (prevState: any, formData: FormData) => Promise<{ error: string | null } | void>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, action, isPending] = useActionState(actionFn as any, { error: null });

  return (
    <form action={action} className={`relative ${className}`}>
      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl mb-4">
          {state.error}
        </div>
      )}
      
      {/* We pass a contextual class or disabled state to children using a basic fieldset */}
      <div className={isPending ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
        <fieldset disabled={isPending} className="contents">
          {children}
        </fieldset>
      </div>

      {isPending && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl">
          <div className="bg-black/60 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center border border-white/10 shadow-xl">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">Processing</span>
          </div>
        </div>
      )}
    </form>
  );
}
