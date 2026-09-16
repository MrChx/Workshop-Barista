"use client";

import { Calendar, Clock, MapPin, Coffee, Users, Map, Info, User, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({ name: "", group: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi pengiriman data
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setFormData({ name: "", group: "" });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* HEADER / NAV */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-coffee-cream/50 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-coffee-dark text-xl">
                        <Coffee className="w-6 h-6 text-[#5c1a1f]" />
                        <span>BaristaMaster</span>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-coffee-medium">
                        <a href="#about" className="hover:text-[#5c1a1f] transition-colors">Tentang</a>
                        <a href="#register" className="hover:text-[#5c1a1f] transition-colors">Registrasi</a>
                        <a href="#location" className="hover:text-[#5c1a1f] transition-colors">Lokasi</a>
                    </nav>
                    <a href="#register" className="bg-[#5c1a1f] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#4a1519] transition-colors">
                        Daftar Sekarang
                    </a>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-coffee-cream/30 to-background z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
                        alt="Coffee preparation"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#5c1a1f]/10 text-[#5c1a1f] text-sm font-bold mb-6">
                        Generus Gorontalo
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-coffee-dark tracking-tight mb-6 leading-tight max-w-3xl">
                        Workshop Kemandirian <br />
                        <span className="text-[#5c1a1f]">Barista</span>
                    </h1>
                    <p className="text-lg md:text-xl text-coffee-medium mb-10 max-w-2xl mx-auto">
                        Punya mimpi kerja di coffee shop hits atau malahan mau buka kedai kopi sendiri?
                        Yuk, wujudkan lewat Pelatihan Barista.
                        Daripada cuma nongkrong dan buang waktu, mending skill ngopi kamu diasah langsung sama ahlinya.
                    </p>

                    {/* JADWAL & LOKASI INFO BOX (Sesuai Revisi) */}
                    <div className="bg-[#5c1a1f] p-6 rounded-2xl flex flex-col gap-6 text-left w-full max-w-lg mx-auto shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center border border-white/20 rounded-xl w-14 h-14 bg-white/5 shrink-0">
                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">SEP</span>
                                <span className="text-lg font-bold text-white leading-none">21</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg">Sabtu, 26 September</p>
                                <p className="text-gray-300 text-sm">15.00 wita - Selesai</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center border border-white/20 rounded-xl w-14 h-14 bg-white/5 shrink-0">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg">Berdua Kopi Telaga</p>
                                <p className="text-gray-300 text-sm">Jl. Ahmad A. Wahab, Luhu, Kec. Telaga, Kabupaten Gorontalo, Gorontalo 96181</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[#5c1a1f] font-semibold mb-4">
                            <Info className="w-5 h-5" />
                            <span>Tentang Acara</span>
                        </div>
                        <p className="text-coffee-medium mb-6 leading-relaxed">
                            Workshop ini dirancang buat teman-teman Generus LDII Gorontalo untuk memperdalam skill wirausaha dan membentuk karakter generasi muda yang mandiri serta produktif. Di sini kamu bakal belajar dari nol tentang:
                        </p>
                        <ul className="space-y-4">
                            {['Mengenal berbagai jenis biji kopi nusantara', 'Teknik dasar manual brew', 'penggunaan mesin espresso', 'Dasar latte art biar makin aesthetic'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-coffee-dark font-medium">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-[#5c1a1f]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop"
                            alt="Barista at work"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* REGISTRATION & LOCATION SECTION */}
            <section className="py-20 px-6 bg-coffee-cream/30">
                <div className="max-w-5xl mx-auto flex flex-col gap-12">

                    {/* FORM REGISTRASI DULUAN (Sesuai Revisi) */}
                    <div id="register" className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 max-w-2xl w-full mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-coffee-dark mb-2">Buruan Daftar!</h2>
                            <p className="text-coffee-medium">Hanya tersedia untuk 50 peserta. Daftar sekarang!</p>
                        </div>

                        {isSubmitted ? (
                            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-4">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-md">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-green-800">Pendaftaran Berhasil!</h3>
                                <p className="text-sm text-green-700">
                                    Terima kasih telah mendaftar. Kami akan mengirimkan detail acara ke kontak Anda.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 text-sm font-semibold underline text-green-600 hover:text-green-800"
                                >
                                    Daftar untuk peserta lain
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] sm:text-sm"
                                            placeholder="Masukkan nama Anda"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-coffee-dark mb-2">
                                        Asal Kelompok
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            required
                                            value={formData.group}
                                            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5c1a1f] sm:text-sm appearance-none"
                                        >
                                            <option value="" disabled>Pilih sesi...</option>
                                            <option value="A">Sesi Pagi (09:00 - 12:00)</option>
                                            <option value="B">Sesi Siang (13:00 - 15:00)</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#5c1a1f] hover:bg-[#4a1519] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c1a1f] transition-colors disabled:opacity-70"
                                >
                                    {isLoading ? "Memproses..." : "Daftar Workshop"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* LOKASI (Sesuai Revisi) */}
                    <div id="location" className="max-w-2xl w-full mx-auto">
                        <div className="bg-[#5c1a1f] p-6 rounded-2xl w-full shadow-xl">
                            <h3 className="text-white text-lg font-bold border-b border-white/20 pb-3 mb-4">Lokasi</h3>
                            <p className="text-gray-300 text-sm mb-6">Jl. Ahmad A. Wahab, Luhu, Kec. Telaga, Kabupaten Gorontalo, Gorontalo 96181</p>

                            <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-sm border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6120098244633!2d123.04008300000001!3d0.5826713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792dadbe212453%3A0x16c206f1320f8f7d!2sBerdua%20Kopi%20Telaga!5e0!3m2!1sid!2sid!4v1789564468887!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#2d1810] py-8 px-6 border-t border-white/10">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 font-bold text-white text-xl mb-4">
                        <Coffee className="w-6 h-6 text-[#5c1a1f]" />
                        <span>BaristaMaster</span>
                    </div>
                    <p className="text-coffee-cream/60 text-sm">
                        &copy; {new Date().getFullYear()} BaristaMaster Workshop. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
