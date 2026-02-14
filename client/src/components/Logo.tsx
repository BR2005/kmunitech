export default function Logo({ className = "w-10 h-10", showText = false }: { className?: string, showText?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`relative ${className} shrink-0`}>
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                    {/* Outer Ring */}
                    <circle cx="100" cy="100" r="95" className="stroke-white/90" strokeWidth="4" fill="url(#grad1)" />
                    <circle cx="100" cy="100" r="85" className="stroke-white/20" strokeWidth="1" />

                    {/* Definitions */}
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="200" y2="200">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                        <path id="textPath" d="M 30,100 A 70,70 0 0 1 170,100" />
                    </defs>

                    {/* Arched Text */}
                    <text className="fill-white text-[18px] font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                        <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                            Universal Tech
                        </textPath>
                    </text>

                    {/* Central Elements */}
                    <g transform="translate(100, 100)">
                        {/* Lightbulb (Innovation) */}
                        <path d="M-15 -35 Q0 -55 15 -35 Q20 -25 15 -15 L10 -5 L-10 -5 L-15 -15 Q-20 -25 -15 -35" fill="none" strokeWidth="2" className="stroke-primary-400" />
                        <path d="M-5 -5 L-5 5 M0 -5 L0 5 M5 -5 L5 5" strokeWidth="2" className="stroke-primary-400" />

                        {/* Gear (Engineering) */}
                        <circle r="25" fill="none" strokeWidth="2" className="stroke-accent-400/50" strokeDasharray="4 2" />

                        {/* Person/Team (Community) */}
                        <path d="M-20 25 Q-20 15 0 15 Q20 15 20 25" fill="none" strokeWidth="2" className="stroke-white" />
                        <circle cx="0" cy="0" r="8" className="fill-white" />

                        {/* Side icons */}
                        <path d="M-40 0 L-30 10 L-25 0" fill="none" strokeWidth="1.5" className="stroke-emerald-400" opacity="0.6" /> {/* Graph/growth */}
                        <rect x="30" y="-5" width="10" height="14" rx="2" strokeWidth="1.5" fill="none" className="stroke-amber-400" opacity="0.6" /> {/* Book/Tablet */}
                    </g>

                    {/* Bottom Ribbon */}
                    <path d="M20 150 L180 150 L170 180 L30 180 L20 150Z" className="fill-primary-600" />
                    <text x="100" y="172" textAnchor="middle" className="fill-white text-[16px] font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>KM UniTech</text>

                    {/* Stars on Ribbon */}
                    <path d="M35 165 L40 160 L45 165 L40 170 Z" className="fill-white" />
                    <path d="M165 165 L160 160 L155 165 L160 170 Z" className="fill-white" />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                        KM Unitech
                    </span>
                    <span className="text-[10px] text-primary-300 font-medium tracking-widest uppercase">
                        Universal Tech Solutions
                    </span>
                </div>
            )}
        </div>
    );
}
