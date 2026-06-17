import React from "react"
import { Zap, Palette, Download, Layout, Sparkles, Shield, Gauge } from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: <Layout className="w-6 h-6" />,
            title: "4 Premium Templates",
            description: "Choose from Classic, Modern, Minimal, and Minimal+Image templates — all professionally designed and ATS-friendly.",
            color: "violet",
            bgHover: "hover:bg-[rgba(139,92,246,0.08)]",
            borderHover: "hover:border-[rgba(139,92,246,0.3)]",
            iconColor: "text-[rgba(167,139,250,1)] bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.2)]"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Custom Colors & Styling",
            description: "Personalize your resume with accent color pickers, custom fonts, and a real-time live preview that updates instantly.",
            color: "moss",
            bgHover: "hover:bg-[rgba(111,163,122,0.08)]",
            borderHover: "hover:border-[rgba(111,163,122,0.3)]",
            iconColor: "text-[#6fa37a] bg-[rgba(111,163,122,0.15)] border border-[rgba(111,163,122,0.2)]"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "Export to PDF & JSON",
            description: "Download your resume as a print-perfect PDF or save your data as JSON for easy backup and portability.",
            color: "amber",
            bgHover: "hover:bg-[rgba(205,138,75,0.08)]",
            borderHover: "hover:border-[rgba(205,138,75,0.3)]",
            iconColor: "text-[#cd8a4b] bg-[rgba(205,138,75,0.15)] border border-[rgba(205,138,75,0.2)]"
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered Suggestions",
            description: "Get smart suggestions for professional summaries, skills, and experience descriptions powered by AI.",
            color: "blue",
            bgHover: "hover:bg-[rgba(59,130,246,0.08)]",
            borderHover: "hover:border-[rgba(59,130,246,0.3)]",
            iconColor: "text-[rgba(96,165,250,1)] bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.2)]"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy First",
            description: "All your data stays in your browser. No server uploads, no tracking — your resume data is 100% private.",
            color: "rose",
            bgHover: "hover:bg-[rgba(244,63,94,0.08)]",
            borderHover: "hover:border-[rgba(244,63,94,0.3)]",
            iconColor: "text-[rgba(251,113,133,1)] bg-[rgba(244,63,94,0.15)] border border-[rgba(244,63,94,0.2)]"
        },
        {
            icon: <Gauge className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Built with React and Vite for blazing-fast performance. No loading screens, no delays — just build and go.",
            color: "indigo",
            bgHover: "hover:bg-[rgba(99,102,241,0.08)]",
            borderHover: "hover:border-[rgba(99,102,241,0.3)]",
            iconColor: "text-[rgba(129,140,248,1)] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.2)]"
        }
    ]

    return (
        <div id='features' className='py-28 px-4 scroll-mt-12 relative z-10'>
            <div className="max-w-6xl mx-auto relative">
                {/* Background glow for features */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(111,163,122,0.05)_0%,transparent_70%)] -z-10 pointer-events-none"></div>

                {/* Header */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#cd8a4b] mb-6 px-4 py-1.5 rounded-full border border-[#cd8a4b]/30 bg-[#cd8a4b]/10">
                        <Zap width={14} />
                        <span>Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 font-grotesk tracking-tight">
                        Everything You Need to Build the
                        <span className="text-mossamber font-serif-italic block sm:inline sm:ml-3 font-normal"> Perfect Resume</span>
                    </h2>
                    <p className="text-[rgba(255,255,255,0.6)] max-w-xl text-lg leading-relaxed font-sans">
                        Powerful features designed to help you create professional, standout resumes in minutes.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group p-8 rounded-2xl glass-soft transition-all duration-300 cursor-pointer ${feature.bgHover} ${feature.borderHover}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${feature.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[rgba(255,255,255,0.95)] mb-3 font-grotesk tracking-tight">{feature.title}</h3>
                            <p className="text-[15px] text-[rgba(255,255,255,0.55)] leading-relaxed font-sans group-hover:text-[rgba(255,255,255,0.7)] transition-colors">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features
