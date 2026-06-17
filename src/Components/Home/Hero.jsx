import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ExternalLink } from 'lucide-react';

const Hero = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]

    return (
        <>
            <div className="min-h-screen pb-20 liquid-bg relative overflow-hidden">
                {/* Navbar (Landing page specific if needed, else we rely on Layout. But Home uses its own Layout? No, Home doesn't use Layout wrapper, it has its own Navbar inside Hero. Wait, Home doesn't have a Navbar component rendered, it renders Banner, Hero, Features... so Hero contains the landing page nav.) */}
                <nav className="z-50 flex items-center justify-between w-full py-6 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="/" className="flex items-center gap-2 text-white">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3f6b54] to-[#6fa37a] flex items-center justify-center text-[#0a0a1a] font-bold font-grotesk text-lg shadow-lg border border-[rgba(255,255,255,0.2)]">
                            R
                        </div>
                        <span className="font-grotesk font-bold text-xl tracking-tight">ResumeAI</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-[rgba(255,255,255,0.7)] font-mono text-[13px]">
                        <a href="#" className="hover:text-white transition">Home</a>
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
                        <a href="#cta" className="hover:text-white transition">Contact</a>
                    </div>

                    <div className="flex gap-3">
                        <Link to='/app' className="hidden md:flex items-center px-6 py-2.5 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.12)] active:scale-95 transition-all rounded-full text-white font-medium shadow-md font-grotesk tracking-wide">
                            Login
                        </Link>
                        <Link to='/app' className="hidden md:flex items-center px-6 py-2.5 bg-gradient-to-r from-[#6fa37a] to-[#3f6b54] hover:from-[#86b696] hover:to-[#6fa37a] border border-[#86b696]/30 active:scale-95 transition-all rounded-full text-white font-medium shadow-lg shadow-[#3f6b54]/20 font-grotesk tracking-wide">
                            Get Started Free
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-[#0a0a1a]/90 backdrop-blur-xl text-white flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="#" className="text-white hover:text-[#6fa37a] transition font-grotesk">Home</a>
                    <a href="#features" className="text-white hover:text-[#6fa37a] transition font-grotesk">Features</a>
                    <a href="#testimonials" className="text-white hover:text-[#6fa37a] transition font-grotesk">Testimonials</a>
                    <a href="#cta" className="text-white hover:text-[#6fa37a] transition font-grotesk">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-[#3f6b54] hover:bg-[#6fa37a] transition text-white rounded-md flex mt-4">
                        ✕
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-white">
                    {/* Social proof */}
                    <div className="flex items-center mt-24 animate-fade-in-up glass-soft px-4 py-2 rounded-full border border-[rgba(111,163,122,0.2)]">
                        <div className="flex -space-x-3 pr-3 border-r border-[rgba(255,255,255,0.1)]">
                            <img src="https://i.pinimg.com/736x/4c/10/f8/4c10f83093b9a53fa8a3b79ee42bdc35.jpg" alt="user" className="size-7 object-cover rounded-full border border-[#0a0a1a] hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://i.pinimg.com/1200x/9a/89/e9/9a89e95fa6b3a69373c10a85927d761e.jpg" alt="user" className="size-7 object-cover rounded-full border border-[#0a0a1a] hover:-translate-y-0.5 transition z-2" />
                            <img src="https://i.pinimg.com/736x/be/a0/94/bea094206178df9941f3a28da7f2f8ed.jpg" alt="user" className="size-7 object-cover rounded-full border border-[#0a0a1a] hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://i.pinimg.com/736x/bf/b5/33/bfb533e3b53f56cd85560a1836713b0c.jpg" alt="user" className="size-7 object-cover rounded-full border border-[#0a0a1a] hover:-translate-y-0.5 transition z-[4]" />
                        </div>

                        <div className="pl-3 flex items-center gap-2">
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#cd8a4b]"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-[13px] text-[rgba(255,255,255,0.8)] font-mono tracking-wide">
                                Loved by 10,000+ professionals
                            </p>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-grotesk max-w-4xl text-center mt-10 md:leading-[1.1] tracking-tight animate-fade-in-up">
                        Editorial-quality
                        <span className="text-mossamber font-serif-italic block sm:inline sm:ml-4 font-normal">resumes</span><br className="hidden sm:block"/>
                        shipped on a six-week cadence.
                    </h1>

                    <p className="max-w-xl text-center text-lg text-[rgba(255,255,255,0.6)] my-8 leading-relaxed font-sans animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Create stunning, ATS-friendly resumes with our AI-powered builder. 
                        Choose from premium templates, customize colors, and export instantly.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <Link to='/app' className="bg-gradient-to-r from-[#cd8a4b] to-[#a86930] hover:from-[#df9e61] hover:to-[#cd8a4b] text-white rounded-full px-9 h-14 flex items-center transition-all font-semibold font-grotesk shadow-lg shadow-[#cd8a4b]/20 active:scale-95 gap-2 text-base border border-[rgba(255,255,255,0.15)]">
                            Start Building Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#features" className="flex items-center gap-2 glass hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-full px-8 h-14 text-[rgba(255,255,255,0.9)] font-medium font-grotesk active:scale-95 text-base">
                            <Play className="w-4 h-4 fill-[rgba(255,255,255,0.7)] text-transparent" />
                            <span>See Templates</span>
                        </a>
                    </div>

                    {/* Trusted by */}
                    <p className="py-6 text-[rgba(255,255,255,0.4)] mt-16 text-[11px] font-mono tracking-[0.2em] uppercase animate-fade-in-up" style={{ animationDelay: '300ms' }}>Trusted by teams at leading companies</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-8 max-w-3xl w-full mx-auto py-4 opacity-50 grayscale animate-fade-in-up hover:grayscale-0 hover:opacity-100 transition-all duration-700" style={{ animationDelay: '400ms' }}>
                        {logos.map((logo, index) => <img key={index} src={logo} alt="company logo" className="h-6 w-auto max-w-xs transition-opacity mix-blend-screen" />)}
                    </div>

                    {/* Candidate badge */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl glass border border-[rgba(111,163,122,0.2)] shadow-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cd8a4b] to-[#a86930] flex items-center justify-center text-[#0a0a1a] text-sm font-bold shadow-inner border border-[rgba(255,255,255,0.2)]">
                                AP
                            </div>
                            <div className="text-left">
                                <p className="text-[15px] font-semibold text-[rgba(255,255,255,0.95)] font-grotesk">Built by Arun Pratap Singh</p>
                                <p className="text-[12px] text-[rgba(255,255,255,0.5)] font-mono">b24bs2044@iitj.ac.in</p>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.1)] mx-2"></div>
                        <a
                            href="https://digitalheroesco.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a0a1a] text-white text-sm font-semibold hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(111,163,122,0.4)] transition-all glow-pulse font-grotesk tracking-wide"
                        >
                            <ExternalLink className="w-4 h-4 text-[#6fa37a]" />
                            <span className="text-mossamber">Built for Digital Heroes</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero