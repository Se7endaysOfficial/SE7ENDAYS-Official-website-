import Image from "next/image"

const team = [
  {
    name: "Mike",
    role: "Founder & Lead Developer",
    image: "/images/mike.png",
    delay: "0s",
  },
  {
    name: "Barry",
    role: "Senior Developer",
    image: "/images/barry.png",
    delay: "0.1s",
  },
  {
    name: "Ninezy",
    role: "Creative Director",
    image: "/images/ninezy.png",
    delay: "0.2s",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="bg-white py-16 md:py-30 px-5 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto relative z-[1]">
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-4">
            Our Team
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-[#1a1a1a] mb-5 tracking-[-0.03em] leading-[1.2]">
            Meet the creators behind SE7ENDAYS
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed font-normal max-w-[640px] mx-auto">
            A dedicated team of developers and designers pushing the boundaries
            of Bedrock Edition.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member) => (
            <div
              key={member.name}
              className="text-center p-10 bg-gray-50 rounded-[20px] border border-black/6 transition-all duration-400 hover:bg-white hover:border-black/10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] group animate-fade-in-up"
              style={{ animationDelay: member.delay }}
            >
              <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 border-3 border-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-transform duration-400 relative">
                <div className="absolute inset-[-3px] bg-gradient-to-br from-[#1a1a1a] to-gray-500 rounded-full z-[-1] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 tracking-[-0.02em]">
                {member.name}
              </h3>
              <p className="text-[0.9375rem] text-gray-500 font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
