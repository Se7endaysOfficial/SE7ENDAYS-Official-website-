import Link from "next/link"
import { Mail } from "lucide-react"

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const socialLinks = [
  {
    href: "mailto:se7endays.official@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://www.tiktok.com/@se7endays.studio?lang=en",
    label: "TikTok",
    icon: TikTokIcon,
  },
  {
    href: "https://www.youtube.com/@SE7ENDAYS.studio",
    label: "YouTube",
    icon: YouTubeIcon,
  },
  {
    href: "https://discord.gg/zePJBTFu6N",
    label: "Discord",
    icon: DiscordIcon,
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1a1a1a] border-t border-white/10 py-16 md:pt-24 md:pb-12 px-5 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_0.8fr_1fr] gap-10 lg:gap-24 mb-16 md:mb-20 items-start">
          <div className="max-w-[380px]">
            <div className="text-[1.75rem] font-extrabold text-white mb-5 tracking-[-0.03em]">
              SE7ENDAYS Studio
            </div>
            <p className="text-base text-gray-400 leading-relaxed font-normal">
              Professional Minecraft Bedrock Edition development studio
              specializing in advanced add-ons and cinematic experiences.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-bold text-white mb-6 uppercase tracking-[0.12em]">
              Navigation
            </div>
            <div className="flex flex-col gap-4">
              {["Work", "Team", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 text-base transition-colors duration-300 hover:text-white w-fit relative group"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-bold text-white mb-6 uppercase tracking-[0.12em]">
              Connect
            </div>
            <div className="flex gap-3.5 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#1a1a1a] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.25)]"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.9375rem] text-gray-500 font-normal">
            © 2026 SE7ENDAYS Studio. All rights reserved.
          </p>
          <div className="flex gap-10 items-center">
            <Link
              href="#"
              className="text-gray-500 text-[0.9375rem] transition-colors duration-300 hover:text-gray-400 font-normal"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-[0.9375rem] transition-colors duration-300 hover:text-gray-400 font-normal"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
