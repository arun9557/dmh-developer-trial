import React from 'react'
import { Sparkles } from 'lucide-react'

const Banner = () => {
    return (
        <div className="w-full py-2.5 text-[13px] tracking-wide border-b border-[rgba(111,163,122,0.15)] bg-[#0f1713] text-[#f1f5f9] flex items-center justify-center gap-2 no-print relative z-50">
            <Sparkles className="w-3.5 h-3.5 text-[#cd8a4b]" />
            <p className="font-medium font-mono text-slate-300">
                AI-Powered Resume Builder — 
                <span className="text-mossamber font-bold font-grotesk tracking-normal ml-1"> Create, Customize & Download</span> your perfect resume
            </p>
            <Sparkles className="w-3.5 h-3.5 text-[#cd8a4b]" />
        </div>
    )
}

export default Banner