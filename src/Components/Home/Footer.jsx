import React from "react";
import { ExternalLink } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <a href="/">
                            <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
                        </a>
                        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                            Create stunning, ATS-optimized resumes with our AI-powered builder. Land your dream job faster.
                        </p>
                        <a
                            href="https://digitalheroesco.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all glow-pulse shadow-md"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Built for Digital Heroes
                        </a>
                    </div>

                    {/* Product Links */}
                    <div>
                        <p className="text-slate-800 font-semibold text-sm mb-3">Product</p>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="/" className="hover:text-yellow-600 transition">Home</a></li>
                            <li><a href="#features" className="hover:text-yellow-600 transition">Features</a></li>
                            <li><a href="#testimonials" className="hover:text-yellow-600 transition">Testimonials</a></li>
                            <li><a href="/app" className="hover:text-yellow-600 transition">Dashboard</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <p className="text-slate-800 font-semibold text-sm mb-3">Templates</p>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="/app" className="hover:text-yellow-600 transition">Classic</a></li>
                            <li><a href="/app" className="hover:text-yellow-600 transition">Modern</a></li>
                            <li><a href="/app" className="hover:text-yellow-600 transition">Minimal</a></li>
                            <li><a href="/app" className="hover:text-yellow-600 transition">Minimal + Image</a></li>
                        </ul>
                    </div>

                    {/* Developer */}
                    <div>
                        <p className="text-slate-800 font-semibold text-sm mb-3">Developer</p>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
                                AP
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">Arun Pratap Singh</p>
                                <p className="text-xs text-slate-500">b24bs2044@iitj.ac.in</p>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition">Digital Heroes ↗</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} Resume Builder by Arun Pratap Singh. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer