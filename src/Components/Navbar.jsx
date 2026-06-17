import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from 'lucide-react';

const Navbar = () => {
    const user = { name: 'Arun Pratap Singh' }
    const navigate = useNavigate()

    const logoutUser = () => {
        navigate('/')
    }

    return (
        <div className="glass sticky top-0 z-40 border-b border-[rgba(111,163,122,0.15)] no-print">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 transition-all">
                <Link to="/" className="flex items-center gap-2">
                    {/* Using an icon and text for logo since the logo.svg might be dark on dark bg */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3f6b54] to-[#6fa37a] flex items-center justify-center text-[#0a0a1a] font-bold font-grotesk text-lg shadow-lg border border-[rgba(255,255,255,0.2)]">
                        R
                    </div>
                    <span className="font-grotesk font-bold text-xl tracking-tight text-white">ResumeAI</span>
                </Link>

                <div className="flex items-center gap-3 text-sm">
                    {/* Candidate info */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft border border-[rgba(111,163,122,0.3)] candidate-badge transition hover:bg-[rgba(255,255,255,0.06)]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#cd8a4b] to-[#a86930] flex items-center justify-center text-[#0a0a1a] text-xs font-bold shadow-inner">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-[rgba(255,255,255,0.95)] font-medium font-sans">{user.name}</span>
                    </div>

                    {/* Digital Heroes Badge */}
                    <a
                        href="https://digitalheroesco.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] text-white text-xs font-semibold hover:from-[#86b696] hover:to-[#6fa37a] transition-all shadow-lg shadow-[#3f6b54]/20 border border-[rgba(255,255,255,0.1)] digital-heroes-badge"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="font-grotesk tracking-wide">Built for Digital Heroes</span>
                    </a>

                    <button
                        onClick={logoutUser}
                        className="bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.1)] rounded-full px-5 py-2 text-xs font-medium transition-colors active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar