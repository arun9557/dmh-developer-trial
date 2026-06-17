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
            <div className="min-h-screen pb-20 bg-gradient-to-b from-white via-amber-50/30 to-white">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="">
                        <img src="/logo.svg" alt="ResumeAI Logo" className="h-11 w-auto" />
                    </a>
                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-700">
                        <a href="#" className="hover:text-yellow-600 transition font-medium">Home</a>
                        <a href="#features" className="hover:text-yellow-600 transition font-medium">Features</a>
                        <a href="#testimonials" className="hover:text-yellow-600 transition font-medium">Testimonials</a>
                        <a href="#cta" className="hover:text-yellow-600 transition font-medium">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/app' className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 active:scale-95 transition-all rounded-full text-white font-medium shadow-md shadow-yellow-500/20">
                            Get Started Free
                        </Link>
                        <Link to='/login' className="hidden md:block px-6 py-2.5 border border-slate-300 active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 font-medium">
                            Login
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/60 text-white backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="#" className="text-white hover:text-yellow-400 transition">Home</a>
                    <a href="#features" className="text-white hover:text-yellow-400 transition">Features</a>
                    <a href="#testimonials" className="text-white hover:text-yellow-400 transition">Testimonials</a>
                    <a href="#cta" className="text-white hover:text-yellow-400 transition">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-md flex mt-4">
                        ✕
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    {/* Background glow */}
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-yellow-300 blur-[120px] opacity-25"></div>
                    <div className="absolute top-40 xl:top-20 -z-10 right-1/4 size-64 sm:size-80 bg-amber-200 blur-[100px] opacity-20"></div>

                    {/* Social proof */}
                    <div className="flex items-center mt-24 animate-fade-in-up">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://i.pinimg.com/736x/4c/10/f8/4c10f83093b9a53fa8a3b79ee42bdc35.jpg" alt="user" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://i.pinimg.com/1200x/9a/89/e9/9a89e95fa6b3a69373c10a85927d761e.jpg" alt="user" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://i.pinimg.com/736x/be/a0/94/bea094206178df9941f3a28da7f2f8ed.jpg" alt="user" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://i.pinimg.com/736x/bf/b5/33/bfb533e3b53f56cd85560a1836713b0c.jpg" alt="user" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                            <img src="https://i.pinimg.com/736x/93/92/32/939232d4087c26522e8676d34a440080.jpg" alt="user" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                        </div>

                        <div>
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-yellow-500" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                Loved by 10,000+ professionals
                            </p>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-5xl text-center mt-6 md:leading-[80px] tracking-tight animate-fade-in-up">
                        Build Your Perfect
                        <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent"> Resume </span>
                        in Minutes
                    </h1>

                    <p className="max-w-lg text-center text-base text-slate-600 my-7 leading-relaxed animate-fade-in-up">
                        Create stunning, ATS-friendly resumes with our AI-powered builder.
                        Choose from premium templates, customize colors, and export to PDF instantly.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 animate-fade-in-up">
                        <Link to='/app' className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full px-9 h-12 ring-offset-2 ring-1 ring-yellow-400/50 flex items-center transition-all font-semibold shadow-lg shadow-yellow-500/25 active:scale-95 gap-2">
                            Start Building Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to='/app' className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 transition-all rounded-full px-7 h-12 text-slate-700 font-medium active:scale-95">
                            <Play className="w-4 h-4 fill-slate-600" />
                            <span>See Templates</span>
                        </Link>
                    </div>

                    {/* Trusted by */}
                    <p className="py-6 text-slate-500 mt-14 text-sm font-medium tracking-wider uppercase">Trusted by teams at leading companies</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
                        {logos.map((logo, index) => <img key={index} src={logo} alt="company logo" className="h-6 w-auto max-w-xs opacity-60 hover:opacity-100 transition-opacity" />)}
                    </div>

                    {/* Candidate badge */}
                    <div className="mt-12 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm animate-fade-in-up">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                            AP
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-800">Built by Arun Pratap Singh</p>
                            <p className="text-xs text-slate-500">b24bs2044@iitj.ac.in</p>
                        </div>
                        <a
                            href="https://digitalheroesco.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all glow-pulse"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Digital Heroes
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero