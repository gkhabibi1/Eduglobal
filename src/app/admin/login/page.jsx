"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // State untuk form input & UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      if (email === "admin@eduglobal.com" && password === "admin123") {
        // 1. Simpan cookie status login (Berlaku 1 hari / 86400 detik)
        document.cookie = "admin_token=authenticated; path=/; max-age=86400; SameSite=Lax";

        setIsLoading(false);
        // 2. Redirect ke dashboard admin
        router.push("/admin");
      } else {
        setIsLoading(false);
        setErrorMessage("Email atau kata sandi admin tidak valid!");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] font-sans text-white flex flex-col justify-between relative overflow-hidden">
      {/* CDN FontAwesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* Decorative Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#1a6dd4]/20 via-[#3b82f6]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#00c853]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Sederhana */}
      <header className="p-6 md:p-8 relative z-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="EduGlobal Academy" className="h-10 w-auto object-contain brightness-0 invert" />
        </Link>

        <Link 
          href="/" 
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
        >
          <i className="fas fa-arrow-left text-xs"></i> Kembali ke Website
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          
          {/* Badge Portal Admin */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#1a6dd4]/15 border border-[#1a6dd4]/30 text-[#4da6ff] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <i className="fas fa-shield-halved"></i> Area Terbatas
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Admin Login
            </h1>
            <p className="text-sm text-slate-400">
              Masuk untuk mengelola pendaftar, data program, dan analitik.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#0f2042]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            
            {/* Pesan Error */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-3">
                <i className="fas fa-exclamation-circle text-base shrink-0"></i>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Field Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email Admin
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <i className="fas fa-envelope text-sm"></i>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@eduglobal.com"
                    className="w-full bg-[#0a1628]/80 border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Field Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Kata Sandi
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <i className="fas fa-lock text-sm"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a1628]/80 border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/20 bg-[#0a1628] text-[#1a6dd4] focus:ring-[#1a6dd4] focus:ring-offset-0"
                  />
                  <span className="text-xs text-slate-400 font-medium">Ingat saya di perangkat ini</span>
                </label>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1a6dd4] to-[#3b82f6] hover:from-[#155bb3] hover:to-[#2563eb] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-[#1a6dd4]/30 hover:shadow-[#1a6dd4]/50 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin text-sm"></i>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </form>

            {/* Hint Demo (Opsional untuk testing) */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-[11px] text-slate-500">
                Demo Credential: <span className="text-slate-400 font-mono">admin@eduglobal.com</span> / <span className="text-slate-400 font-mono">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Sederhana */}
      <footer className="p-6 text-center text-slate-500 text-xs relative z-10 border-t border-white/5">
        <p>© 2026 EduGlobal Academy. System Security & Access Control.</p>
      </footer>
    </div>
  );
}
