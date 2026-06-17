"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email || !password) {
      setMessage({ text: "Please enter both email and password.", type: "error" });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        if (data?.user?.identities?.length === 0) {
          setMessage({
            text: "This email is already registered. Try logging in instead.",
            type: "error",
          });
        } else {
          setMessage({
            text: "Registration successful! Please check your email inbox to confirm your account.",
            type: "success",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An authentication error occurred.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

      {/* Auth Card container */}
      <div className="w-full max-w-md bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Brand logo & header */}
        <div className="flex flex-col items-center text-center gap-2 mb-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mt-2">
              Product Discovery School
            </h1>
            <p className="text-xs text-foreground/50 mt-1 font-semibold leading-relaxed">
              {isSignUp
                ? "Create an account to start your continuous discovery journey."
                : "Log in to resume your learning and sync your Discovery Canvas."}
            </p>
          </div>
        </div>

        {/* Feedback alerts */}
        {message && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold border leading-relaxed ${
              message.type === "success"
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-in slide-in-from-top-2 duration-150"
                : "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400 animate-in shake duration-150"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@domain.com"
              className="w-full rounded-2xl border border-card-border p-3.5 text-sm font-semibold focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary bg-background outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">
              Password (min 6 characters)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-card-border p-3.5 text-sm font-semibold focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary bg-background outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primary/95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs shadow-md shadow-brand-primary/15 transition-all mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center pt-2 border-t border-card-border/60">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage(null);
            }}
            className="text-xs font-bold text-brand-primary hover:underline"
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "New to Discovery School? Create an account"}
          </button>
        </div>

      </div>
    </div>
  );
}
