import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

const CallToAction = () => {
    return (
        <div id="cta" className="py-20 px-4">
            <div className="flex flex-col items-center justify-center rounded-3xl mx-auto py-20 px-8 max-w-5xl w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px]"></div>
                
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
                    <Zap className="w-4 h-4" />
                    Ready to get started?
                </div>

                <h2 className="md:text-5xl text-3xl font-bold text-white text-center leading-tight">
                    Build Your Dream Resume
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"> Today</span>
                </h2>
                <p className="mt-4 text-slate-400 max-w-xl text-center leading-relaxed">
                    Join thousands of professionals who've landed their dream jobs using our AI-powered resume builder. 
                    Start for free — no credit card required.
                </p>

                <div className="flex items-center gap-4 mt-8 text-sm">
                    <Link to="/app" className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all cursor-pointer px-8 py-3.5 text-white font-semibold rounded-full active:scale-95 flex items-center gap-2 shadow-lg shadow-yellow-500/25">
                        Start Building Free
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="#features" className="group flex items-center gap-2 px-8 py-3.5 cursor-pointer font-medium border border-slate-600 rounded-full text-slate-300 hover:bg-white/5 transition active:scale-95">
                        Learn More
                        <svg className="mt-0.5 group-hover:translate-x-1 transition-all" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CallToAction