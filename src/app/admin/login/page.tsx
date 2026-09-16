"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      router.push("/admin");
    } else {
      setError("Password salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Card */}
          <div className="bg-[#5c1a1f] px-8 py-10 flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" className="h-24 w-auto object-contain mb-4" />
            <h1 className="text-white font-extrabold text-2xl">PPG Gorontalo</h1>
            <p className="text-gray-300 text-sm mt-1">Panel Admin Workshop Barista</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Masuk ke Dashboard</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password Admin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#5c1a1f] text-white font-bold text-sm hover:bg-[#4a1519] transition-colors disabled:opacity-60 shadow-md"
              >
                {isLoading ? "Memverifikasi..." : "Masuk"}
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Hanya untuk pengelola acara.{" "}
              <a href="/" className="text-[#5c1a1f] font-semibold hover:underline">
                Kembali ke halaman utama
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
