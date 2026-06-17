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
        <div className="shadow-sm bg-white/80 backdrop-blur-md border-b border-slate-100 no-print">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition-all">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
                </Link>

                <div className="flex items-center gap-3 text-sm">
                    {/* Candidate info */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 candidate-badge">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-slate-700 font-medium">{user.name}</span>
                    </div>

                    {/* Digital Heroes Badge */}
                    <a
                        href="https://digitalheroesco.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all glow-pulse shadow-md digital-heroes-badge"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Built for Digital Heroes
                    </a>

                    <button
                        onClick={logoutUser}
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-full px-5 py-2 text-xs font-medium transition-colors active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar