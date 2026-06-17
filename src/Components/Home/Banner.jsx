import React from 'react'
import { Sparkles } from 'lucide-react'

const Banner = () => {
    return (
        <div className="w-full py-2.5 text-sm bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center gap-2 no-print">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <p className="font-medium tracking-wide">
                AI-Powered Resume Builder — 
                <span className="text-yellow-400 font-semibold"> Create, Customize & Download</span> your perfect resume
            </p>
            <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
    )
}

export default Banner