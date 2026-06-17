import React from "react"
import { Zap, Palette, Download, Layout, Sparkles, Shield, Gauge } from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: <Layout className="w-6 h-6" />,
            title: "4 Premium Templates",
            description: "Choose from Classic, Modern, Minimal, and Minimal+Image templates — all professionally designed and ATS-friendly.",
            color: "violet",
            bgHover: "group-hover:bg-violet-50",
            borderHover: "group-hover:border-violet-200",
            iconColor: "text-violet-600 bg-violet-100"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Custom Colors & Styling",
            description: "Personalize your resume with accent color pickers, custom fonts, and a real-time live preview that updates instantly.",
            color: "emerald",
            bgHover: "group-hover:bg-emerald-50",
            borderHover: "group-hover:border-emerald-200",
            iconColor: "text-emerald-600 bg-emerald-100"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "Export to PDF & JSON",
            description: "Download your resume as a print-perfect PDF or save your data as JSON for easy backup and portability.",
            color: "amber",
            bgHover: "group-hover:bg-amber-50",
            borderHover: "group-hover:border-amber-200",
            iconColor: "text-amber-600 bg-amber-100"
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered Suggestions",
            description: "Get smart suggestions for professional summaries, skills, and experience descriptions powered by AI.",
            color: "blue",
            bgHover: "group-hover:bg-blue-50",
            borderHover: "group-hover:border-blue-200",
            iconColor: "text-blue-600 bg-blue-100"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy First",
            description: "All your data stays in your browser. No server uploads, no tracking — your resume data is 100% private.",
            color: "rose",
            bgHover: "group-hover:bg-rose-50",
            borderHover: "group-hover:border-rose-200",
            iconColor: "text-rose-600 bg-rose-100"
        },
        {
            icon: <Gauge className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Built with React and Vite for blazing-fast performance. No loading screens, no delays — just build and go.",
            color: "indigo",
            bgHover: "group-hover:bg-indigo-50",
            borderHover: "group-hover:border-indigo-200",
            iconColor: "text-indigo-600 bg-indigo-100"
        }
    ]

    return (
        <div id='features' className='py-20 px-4 scroll-mt-12'>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-400/10 rounded-full px-6 py-1.5 font-medium mb-4">
                        <Zap width={14} />
                        <span>Features</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
                        Everything You Need to Build the
                        <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent"> Perfect Resume</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-center">
                        Powerful features designed to help you create professional, standout resumes in minutes.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer ${feature.bgHover} ${feature.borderHover}`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.iconColor} flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features
