import React from "react";
import { ExternalLink } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-[rgba(111,163,122,0.15)] bg-[rgba(15,23,19,0.95)] mt-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <a href="/" className="flex items-center gap-2 text-white">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3f6b54] to-[#6fa37a] flex items-center justify-center text-[#0a0a1a] font-bold font-grotesk text-base shadow-lg border border-[rgba(255,255,255,0.2)]">
                                R
                            </div>
                            <span className="font-grotesk font-bold text-lg tracking-tight">ResumeAI</span>
                        </a>
                        <p className="mt-5 text-[15px] text-[rgba(255,255,255,0.5)] leading-relaxed font-sans">
                            Create stunning, ATS-optimized resumes with our AI-powered builder. Land your dream job faster.
                        </p>
                        <a
                            href="https://digitalheroesco.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] text-white text-xs font-semibold hover:from-[#86b696] hover:to-[#6fa37a] transition-all glow-pulse shadow-md border border-[rgba(255,255,255,0.1)] font-grotesk tracking-wide"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Built for Digital Heroes
                        </a>
                    </div>

                    {/* Product Links */}
                    <div>
                        <p className="text-[rgba(255,255,255,0.9)] font-bold text-[15px] mb-5 font-grotesk tracking-wide">Product</p>
                        <ul className="space-y-3 text-[14px] text-[rgba(255,255,255,0.5)] font-sans">
                            <li><a href="/" className="hover:text-[#6fa37a] transition-colors">Home</a></li>
                            <li><a href="#features" className="hover:text-[#6fa37a] transition-colors">Features</a></li>
                            <li><a href="#testimonials" className="hover:text-[#6fa37a] transition-colors">Testimonials</a></li>
                            <li><a href="/app" className="hover:text-[#6fa37a] transition-colors">Dashboard</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <p className="text-[rgba(255,255,255,0.9)] font-bold text-[15px] mb-5 font-grotesk tracking-wide">Templates</p>
                        <ul className="space-y-3 text-[14px] text-[rgba(255,255,255,0.5)] font-sans">
                            <li><a href="/app" className="hover:text-[#6fa37a] transition-colors">Classic</a></li>
                            <li><a href="/app" className="hover:text-[#6fa37a] transition-colors">Modern</a></li>
                            <li><a href="/app" className="hover:text-[#6fa37a] transition-colors">Minimal</a></li>
                            <li><a href="/app" className="hover:text-[#6fa37a] transition-colors">Minimal + Image</a></li>
                        </ul>
                    </div>

                    {/* Developer */}
                    <div>
                        <p className="text-[rgba(255,255,255,0.9)] font-bold text-[15px] mb-5 font-grotesk tracking-wide">Developer</p>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cd8a4b] to-[#a86930] flex items-center justify-center text-[#0a0a1a] text-sm font-bold border border-[rgba(255,255,255,0.2)]">
                                AP
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-[rgba(255,255,255,0.9)] font-grotesk tracking-wide">Arun Pratap Singh</p>
                                <p className="text-[12px] text-[rgba(255,255,255,0.4)] font-mono mt-0.5">b24bs2044@iitj.ac.in</p>
                            </div>
                        </div>
                        <ul className="space-y-2 text-[13px] text-[rgba(255,255,255,0.5)] font-mono">
                            <li><a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#cd8a4b] transition-colors flex items-center gap-1.5">Digital Heroes <ExternalLink className="w-3 h-3"/></a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-[rgba(255,255,255,0.4)] font-mono">
                    <p>© {new Date().getFullYear()} Resume Builder by Arun Pratap Singh. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-[rgba(255,255,255,0.8)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[rgba(255,255,255,0.8)] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer