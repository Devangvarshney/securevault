import React from 'react';
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Folder, ArrowRight, FileText, Upload, Trash2, Download } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '40px 40px' }}>
            </div>

            {/* Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
                <div className="flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-md flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-lg">StudentVault</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm text-gray-400">
                        <a href="#features" className="hover:text-white transition">How it Works</a>
                        <a href="#security" className="hover:text-white transition">Security</a>
                    </div>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-indigo-500/20"
                    >
                        Access Vault
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-48 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Content */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
                        <Lock className="w-3 h-3" /> No Registration Required
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] mb-8 tracking-tight">
                        Your documents, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">one password away.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                        The lightweight vault for students. Store assignments, IDs, and notes securely. Access them instantly on any device without the friction of email logins.
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <Lock className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">Master Password</h4>
                                <p className="text-xs text-gray-500">Single-key access system</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <Folder className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">Zero Friction</h4>
                                <p className="text-xs text-gray-500">No email or signup needed</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => navigate("/login")}
                            className="bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition shadow-xl shadow-indigo-600/20"
                        >
                            Open Your Vault <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Content - Vault Interface Mockup */}
                <div className="relative">
                    <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
                        {/* Window Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                            </div>
                            <div className="bg-white/5 px-3 py-1 rounded text-[10px] font-mono text-gray-500 border border-white/5">
                                vault_session_active
                            </div>
                        </div>

                        {/* Search & Actions */}
                        <div className="flex gap-3 mb-6">
                            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-500 flex items-center gap-2">
                                Search documents...
                            </div>
                            <div className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                <Upload className="w-3 h-3" /> Upload
                            </div>
                        </div>

                        {/* File List Mockup */}
                        <div className="space-y-3">
                            <FileRow name="Resume_v2.pdf" size="1.2 MB" date="2 mins ago" />
                            <FileRow name="College_ID_Scan.jpg" size="450 KB" date="1 hour ago" />
                            <FileRow name="History_Notes.docx" size="890 KB" date="Yesterday" />
                            <FileRow name="Project_Final.pdf" size="4.5 MB" date="Mar 14" />
                        </div>

                        {/* Storage Indicator */}
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                                <span>Storage Used</span>
                                <span>7.04 MB / 100 MB</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full w-[12%]"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 bg-indigo-600 p-4 rounded-2xl shadow-2xl rotate-3">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-20 bg-[#080808] py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-indigo-500 rounded-sm"></div>
                        <span className="font-bold text-white">StudentVault</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Built for speed. Secured with industry-standard hashing. No tracking.
                    </p>
                    <div className="mt-8 text-[11px] text-gray-600 uppercase tracking-widest">
                        © 2026 StudentVault Project — Secure Personal Document Storage
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FileRow = ({ name, size, date }) => (
    <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
                <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-200">{name}</p>
                <p className="text-[10px] text-gray-500">{size} • {date}</p>
            </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <Download className="w-3.5 h-3.5 text-gray-400 hover:text-white cursor-pointer" />
            <Trash2 className="w-3.5 h-3.5 text-gray-500 hover:text-red-400 cursor-pointer" />
        </div>
    </div>
);

export default LandingPage;