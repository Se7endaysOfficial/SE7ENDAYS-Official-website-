import Image from "next/image"

const projects = [
  {
    tag: "Gameplay",
    title: "Parkour++ Add-On",
    description:
      "Advanced movement mechanics featuring wall running, sliding, rolling, and dynamic skill progression with real-time statistics.",
    image: "/images/parkour.png",
    delay: "0s",
  },
  {
    tag: "Cinematic",
    title: "Cinematic Camera System",
    description:
      "Professional camera tools with path recording, drone modes, and smooth interpolation for stunning cinematics.",
    image: "/images/camera.png",
    delay: "0.1s",
  },
  {
    tag: "Visual",
    title: "Vibrant Visuals Pack",
    description:
      "Atmospheric lighting and color grading designed for cinematic experiences with custom fog and horizon effects.",
    image: "/images/visuals.png",
    delay: "0.2s",
  },
]

export function ProjectsSection() {
  return (
    <section id="work" className="py-16 md:py-30 px-5 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto relative z-[1]">
        <div className="max-w-[640px] mb-16 md:mb-20 animate-fade-in-up">
          <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-4">
            Featured Projects
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-[#1a1a1a] mb-5 tracking-[-0.03em] leading-[1.2]">
            Building the future of Minecraft gameplay
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed font-normal">
            Our portfolio showcases advanced mechanics, cinematic systems, and
            visual enhancements that elevate the Bedrock Edition experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white rounded-[20px] overflow-hidden border border-black/8 transition-all duration-500 cursor-pointer hover:shadow-[0_24px_56px_rgba(0,0,0,0.12)] hover:border-black/12 group animate-fade-in-up"
              style={{ animationDelay: project.delay }}
            >
              <div className="aspect-[16/11] overflow-hidden bg-gray-100 relative">
                <div className="absolute top-5 left-5 px-4 py-2 bg-white/95 backdrop-blur-xl rounded-lg text-[11px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a] z-[2] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  {project.tag}
                </div>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={412}
                  className="w-full h-full object-cover object-center transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-8">
                <h3 className="text-[1.375rem] font-bold text-[#1a1a1a] mb-3 tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="text-[0.9375rem] text-gray-500 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
