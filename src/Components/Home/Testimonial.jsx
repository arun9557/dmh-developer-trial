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
        <div id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white via-slate-50/50 to-white scroll-mt-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-400/10 rounded-full px-6 py-1.5 font-medium mb-4">
                        <Quote width={14} />
                        <span>Testimonials</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
                        Loved by <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">Professionals</span> Worldwide
                    </h2>
                    <p className="text-gray-500 max-w-xl text-center">
                        See what our users have to say about their experience building resumes with us.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-yellow-200/60 transition-all duration-300 flex flex-col"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {Array(t.rating).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-yellow-400 text-yellow-400">
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                                "{t.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
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
