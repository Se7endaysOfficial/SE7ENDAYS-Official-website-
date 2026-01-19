import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 md:px-16 pt-24 md:pt-36 pb-15 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,26,26,0.5)] to-[rgba(26,26,26,0.7)] z-[1]" />

      <div className="max-w-[1200px] w-full mx-auto text-center relative z-[2] animate-fade-in-up">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[13px] font-semibold text-white/70 uppercase tracking-[0.12em] mb-6 inline-block pb-3 border-b-2 border-white/20 relative">
            Minecraft Bedrock Development
            <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-white" />
          </div>

          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-7 text-white tracking-[-0.04em] text-balance">
            Crafting premium experiences through code
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-10 font-normal">
            We build professional-grade add-ons for Minecraft Bedrock Edition,
            combining advanced scripting with cinematic design to push the
            boundaries of what{"'"}s possible.
          </p>

          <Link
            href="#work"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a1a1a] rounded-xl font-semibold text-[15px] transition-all duration-400 shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,255,255,0.3)] relative overflow-hidden group"
          >
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-all duration-600 group-hover:left-full" />
            <span>View Our Work</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
