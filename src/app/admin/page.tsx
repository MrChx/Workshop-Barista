"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Users, Search, Download, Trash2, LogOut, RefreshCw, Pencil, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Participant } from "@/lib/supabase";

// Modal Edit Peserta
function EditModal({
  participant,
  onClose,
  onSave,
}: {
  participant: Participant;
  onClose: () => void;
  onSave: (updated: Participant) => void;
}) {
  const [form, setForm] = useState({
    name: participant.name,
    group: participant.group,
    age: String(participant.age),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const res = await fetch("/api/participants", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: participant.id,
        name: form.name,
        group: form.group,
        age: Number(form.age),
      }),
    });

    const json = await res.json();
    setIsSaving(false);

    if (res.ok && json.success) {
      onSave(json.data as Participant);
    } else {
      setError(json.error || "Gagal menyimpan perubahan.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Edit Peserta</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Kelompok</label>
            <input
              type="text"
              required
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Usia</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              value={form.age}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setForm({ ...form, age: val });
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] text-gray-900"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5c1a1f] text-white rounded-xl text-sm font-semibold hover:bg-[#4a1519] transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchParticipants = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    const res = await fetch("/api/participants");

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    const json = await res.json();
    if (json.data) setParticipants(json.data);
    else setError("Gagal memuat data.");

    setIsLoading(false);
    setIsRefreshing(false);
  }, [router]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus peserta ini?")) return;
    setDeletingId(id);

    const res = await fetch("/api/participants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    }
    setDeletingId(null);
  };

  const handleEditSave = (updated: Participant) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingParticipant(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor(92, 26, 31);
    doc.text("Data Peserta Workshop Barista", 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`PPG Gorontalo — Dicetak: ${new Date().toLocaleString("id-ID")}`, 14, 26);

    autoTable(doc, {
      startY: 32,
      head: [["No", "Nama Lengkap", "Kelompok", "Usia", "Waktu Daftar"]],
      body: participants.map((p, i) => [
        i + 1,
        p.name,
        p.group,
        `${p.age} thn`,
        new Date(p.created_at).toLocaleString("id-ID", {
          day: "numeric", month: "short", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        }),
      ]),
      headStyles: {
        fillColor: [92, 26, 31],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [252, 246, 244] },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    doc.save("peserta-workshop-barista.pdf");
  };

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sessionA = participants.filter((p) =>
    p.group.toLowerCase().includes("pagi") || p.group.toLowerCase().includes("a")
  ).length;
  const sessionB = participants.filter((p) =>
    p.group.toLowerCase().includes("siang") || p.group.toLowerCase().includes("b")
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Edit Modal */}
      <AnimatePresence>
        {editingParticipant && (
          <EditModal
            participant={editingParticipant}
            onClose={() => setEditingParticipant(null)}
            onSave={handleEditSave}
          />
        )}
      </AnimatePresence>

      {/* TOP BAR */}
      <header className="bg-[#5c1a1f] text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain bg-white/10 rounded-full p-1" />
            <div>
              <p className="font-extrabold text-lg leading-tight">PPG Gorontalo</p>
              <p className="text-xs text-gray-300">Dashboard Admin Workshop</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { label: "Total Peserta", value: participants.length, color: "bg-blue-100 text-blue-600" },
            { label: "Kelompok / Sesi A", value: sessionA, color: "bg-amber-100 text-amber-600" },
            { label: "Kelompok / Sesi B", value: sessionB, color: "bg-indigo-100 text-indigo-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {isLoading ? <span className="animate-pulse">—</span> : stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900">Data Pendaftar</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama / kelompok..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1a1f]/50 focus:border-[#5c1a1f]"
                />
              </div>
              <button
                onClick={() => fetchParticipants(true)}
                title="Refresh"
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-[#5c1a1f] text-white px-3 py-2 rounded-lg hover:bg-[#4a1519] text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-16 text-center text-gray-400">
                <div className="w-10 h-10 border-4 border-[#5c1a1f]/20 border-t-[#5c1a1f] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm">Memuat data...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center text-red-500 text-sm">{error}</div>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Kelompok</th>
                    <th className="px-6 py-4">Usia</th>
                    <th className="px-6 py-4">Waktu Daftar</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {filtered.length > 0 ? (
                      filtered.map((p, index) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{p.name}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#5c1a1f]/10 text-[#5c1a1f]">
                              {p.group}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium">{p.age} thn</td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(p.created_at).toLocaleString("id-ID", {
                              day: "numeric", month: "short", year: "numeric",
                              hour: "2-digit", minute: "2-digit"
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setEditingParticipant(p)}
                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                title="Edit peserta"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                disabled={deletingId === p.id}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-40"
                                title="Hapus peserta"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                          {searchTerm ? "Tidak ada data yang cocok." : "Belum ada peserta yang mendaftar."}
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
