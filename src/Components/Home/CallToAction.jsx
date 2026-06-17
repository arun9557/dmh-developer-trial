import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

const CallToAction = () => {
    return (
        <div id="cta" className="py-24 px-4 relative z-10">
            <div className="flex flex-col items-center justify-center rounded-[2.5rem] mx-auto py-24 px-8 max-w-5xl w-full bg-[rgba(15,23,19,0.7)] border border-[rgba(111,163,122,0.2)] relative overflow-hidden backdrop-blur-xl shadow-2xl">
                {/* Background decorations */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(111,163,122,0.15)_0%,transparent_60%)] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(205,138,75,0.12)_0%,transparent_60%)] rounded-full pointer-events-none"></div>
                
                <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(205,138,75,0.3)] bg-[rgba(205,138,75,0.1)] text-[#cd8a4b] text-[11px] font-mono tracking-widest uppercase mb-8 z-10">
                    <Zap className="w-3.5 h-3.5" />
                    Ready to get started?
                </div>

                <h2 className="md:text-6xl text-4xl font-bold text-white text-center leading-[1.1] font-grotesk tracking-tight z-10">
                    Build Your Dream Resume
                    <span className="text-mossamber font-serif-italic block sm:inline sm:ml-4 font-normal"> Today</span>
                </h2>
                <p className="mt-6 text-[rgba(255,255,255,0.6)] max-w-xl text-center text-lg leading-relaxed font-sans z-10">
                    Join thousands of professionals who've landed their dream jobs using our AI-powered resume builder. 
                    Start for free — no credit card required.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5 mt-12 text-sm z-10">
                    <Link to="/app" className="bg-gradient-to-r from-[#cd8a4b] to-[#a86930] hover:from-[#df9e61] hover:to-[#cd8a4b] transition-all cursor-pointer px-9 py-4 text-white font-semibold rounded-full active:scale-95 flex items-center gap-2 shadow-lg shadow-[#cd8a4b]/25 font-grotesk tracking-wide text-[15px] border border-[rgba(255,255,255,0.15)]">
                        Start Building Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a href="#features" className="group flex items-center gap-2 px-9 py-4 cursor-pointer font-medium border border-[rgba(255,255,255,0.2)] rounded-full text-[rgba(255,255,255,0.9)] hover:bg-[rgba(255,255,255,0.08)] transition active:scale-95 font-grotesk tracking-wide text-[15px]">
                        Learn More
                        <svg className="mt-0.5 group-hover:translate-x-1 transition-transform" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CallToAction