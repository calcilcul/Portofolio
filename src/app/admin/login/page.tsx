"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b1e16] text-white selection:bg-[color:var(--color-lime-accent)] selection:text-black p-4 font-sans relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-[-5vw] right-[-5vw] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-[color:var(--color-lime-accent)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10vw] left-[-10vw] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#1C1C1A] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 relative z-10"
      >
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Link>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[color:var(--color-lime-accent)] blur-[25px] opacity-40 rounded-full"></div>
            <div className="w-16 h-16 bg-[#1b1e16] border border-white/10 rounded-2xl flex items-center justify-center transform rotate-3 relative z-10 shadow-lg">
              <Lock className="text-[color:var(--color-lime-accent)] w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Restricted Area</h1>
          <p className="text-sm text-gray-400 font-medium tracking-wide">Enter credentials to govern content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide border border-red-100 flex items-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 animate-pulse"></div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[color:var(--color-lime-accent)] transition-colors">
                <User size={18} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-[#1b1e16] text-white placeholder-gray-500 font-medium rounded-xl py-4 pl-12 pr-4 border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-4 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all placeholder:font-medium placeholder:tracking-wide"
                required
              />
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[color:var(--color-lime-accent)] transition-colors">
                <KeyRound size={18} strokeWidth={2.5} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passphrase"
                className="w-full bg-[#1b1e16] text-white placeholder-gray-500 font-medium rounded-xl py-4 pl-12 pr-4 border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-4 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all placeholder:font-medium placeholder:tracking-wide"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[color:var(--color-lime-accent)]/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden mt-8"
          >
            <div className="absolute inset-0 bg-white w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 mix-blend-overlay opacity-20"></div>
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Authenticating..." : "Authorize Access"}
            </span>
          </button>
        </form>
      </motion.div>
      
      <p className="absolute bottom-6 text-xs text-gray-600 font-semibold tracking-widest uppercase text-center w-full">
        Faisal Ramdhani © {currentYear}
      </p>
    </div>
  );
}
