import React from "react"
import { Quote } from "lucide-react"

const Testimonial = () => {
    const testimonials = [
        {
            name: "Sarah Mitchell",
            role: "UX Designer at Google",
            avatar: "https://i.pinimg.com/736x/4c/10/f8/4c10f83093b9a53fa8a3b79ee42bdc35.jpg",
            text: "This resume builder is incredible! I created a stunning resume in under 10 minutes. The templates are modern and the live preview makes it so easy to perfect every detail.",
            rating: 5
        },
        {
            name: "David Park",
            role: "Full Stack Developer",
            avatar: "https://i.pinimg.com/1200x/9a/89/e9/9a89e95fa6b3a69373c10a85927d761e.jpg",
            text: "I've tried many resume builders, but this one stands out. The ability to customize colors and switch between templates instantly is a game-changer. Landed my dream job!",
            rating: 5
        },
        {
            name: "Priya Sharma",
            role: "Product Manager at Microsoft",
            avatar: "https://i.pinimg.com/736x/be/a0/94/bea094206178df9941f3a28da7f2f8ed.jpg",
            text: "Clean, professional, and incredibly fast. The PDF export is pixel-perfect and ATS-friendly. I recommended this to my entire team.",
            rating: 5
        }
    ]

    return (
        <div id="testimonials" className="py-28 px-4 scroll-mt-12 relative z-10 border-t border-[rgba(111,163,122,0.1)] bg-[rgba(15,23,19,0.3)]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#cd8a4b] mb-6 px-4 py-1.5 rounded-full border border-[#cd8a4b]/30 bg-[#cd8a4b]/10">
                        <Quote width={14} />
                        <span>Testimonials</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 font-grotesk tracking-tight">
                        Loved by <span className="text-mossamber font-serif-italic font-normal">Professionals</span> Worldwide
                    </h2>
                    <p className="text-[rgba(255,255,255,0.6)] max-w-xl text-lg leading-relaxed font-sans">
                        See what our users have to say about their experience building resumes with us.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="glass-soft rounded-3xl p-8 hover:border-[rgba(205,138,75,0.3)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-500 flex flex-col group relative overflow-hidden"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(205,138,75,0.1)] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array(t.rating).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#cd8a4b]">
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-[rgba(255,255,255,0.7)] text-[16px] leading-relaxed flex-1 mb-8 font-sans">
                                "{t.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border border-[rgba(255,255,255,0.2)]"
                                />
                                <div>
                                    <p className="text-[15px] font-bold text-white font-grotesk tracking-wide">{t.name}</p>
                                    <p className="text-[12px] text-[rgba(255,255,255,0.4)] font-mono mt-0.5">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonial
