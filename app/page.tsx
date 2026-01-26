"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { LoginModal } from "@/components/login-modal"
import { createClient } from "@/lib/supabase/client"

const projects = [
  {
    tag: "Gameplay",
    image: "/images/parkour.png",
    title: "Parkour++ Add-On",
    desc: "Advanced movement mechanics featuring wall running, sliding, rolling, and dynamic skill progression with real-time statistics.",
  },
  {
    tag: "Cinematic",
    image: "/images/camera.png",
    title: "Cinematic Camera System",
    desc: "Professional camera tools with path recording, drone modes, and smooth interpolation for stunning cinematics.",
  },
  {
    tag: "Visual",
    image: "/images/visuals.png",
    title: "Vibrant Visuals Pack",
    desc: "Atmospheric lighting and color grading designed for cinematic experiences with custom fog and horizon effects.",
  },
]

const stats = [
  { target: 1, label: "Year Experience", suffix: "" },
  { target: 100, label: "Downloads", suffix: "K+" },
  { target: 3, label: "Projects Created", suffix: "" },
  { target: 100, label: "Custom Code", suffix: "%" },
]

const team = [
  { name: "Barry", role: "Senior Developer", image: "/images/barry.png" },
  { name: "Mike", role: "Founder & Lead Developer", image: "/images/mike.png" },
  { name: "Ninezy", role: "Creative Director", image: "/images/ninezy.png" },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0])
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const statsRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Check if user is logged in via Supabase
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }
    checkAuth()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            stats.forEach((stat, index) => {
              const duration = 2000
              const increment = stat.target / (duration / 16)
              let current = 0
              const update = () => {
                current += increment
                if (current >= stat.target) {
                  setAnimatedStats((prev) => {
                    const newStats = [...prev]
                    newStats[index] = stat.target
                    return newStats
                  })
                  return
                }
                setAnimatedStats((prev) => {
                  const newStats = [...prev]
                  newStats[index] = Math.floor(current)
                  return newStats
                })
                requestAnimationFrame(update)
              }
              setTimeout(update, (index + 2) * 100)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <LoginModal 
        open={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="logo" draggable={false}>
            <Image
              src="/images/s7d_logo_white.png"
              alt=""
              width={40}
              height={40}
              className="logo-icon"
              draggable={false}
            />
            SE7ENDAYS Studio
          </a>
          <div className="nav-links">
            <a href="#work" className="nav-link" draggable={false}>
              Work
            </a>
            <a href="#team" className="nav-link" draggable={false}>
              Team
            </a>
            <a href="#contact" className="nav-link" draggable={false}>
              Contact
            </a>
            {isLoggedIn ? (
              <a href="/tools" className="nav-link nav-tools">
                Tools
              </a>
            ) : (
              <button 
                onClick={() => setLoginModalOpen(true)} 
                className="nav-link nav-login"
              >
                Team Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">Minecraft Bedrock Development</div>
            <h1 className="hero-title">Crafting premium experiences through code</h1>
            <p className="hero-desc">
              We build professional-grade add-ons for Minecraft Bedrock Edition, combining advanced
              scripting with cinematic design to push the boundaries of what{"'"}s possible.
            </p>
            <a href="#work" className="hero-cta">
              <span>View Our Work</span>
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">Featured Projects</div>
            <h2 className="section-title">Building the future of Minecraft gameplay</h2>
            <p className="section-desc">
              Our portfolio showcases advanced mechanics, cinematic systems, and visual enhancements
              that elevate the Bedrock Edition experience.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <div className="project-tag">{project.tag}</div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={412}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-number">
                {animatedStats[index]}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "100%" }}>
            <div className="section-label">Our Team</div>
            <h2 className="section-title">Meet the creators behind SE7ENDAYS</h2>
            <p className="section-desc">
              A dedicated team of developers and designers pushing the boundaries of Bedrock
              Edition.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "100%" }}>
            <div className="section-label">Collaborations</div>
            <h2 className="section-title">Trusted by leading creators</h2>
            <p className="section-desc">
              We{"'"}ve partnered with top studios to deliver exceptional Minecraft experiences.
            </p>
          </div>
          <div className="clients-grid">
            <Image
              src="/images/blocklab_studios.png"
              alt="BlockLab Studios"
              width={200}
              height={80}
              className="client-logo"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">SE7ENDAYS Studio</div>
              <p className="footer-tagline">
                Professional Minecraft Bedrock Edition development studio specializing in advanced
                add-ons and cinematic experiences.
              </p>
            </div>
            <div className="footer-section">
              <div className="footer-title">Navigation</div>
              <div className="footer-links">
                <a href="#work" className="footer-link" draggable={false}>
                  Work
                </a>
                <a href="#team" className="footer-link" draggable={false}>
                  Team
                </a>
                <a href="#contact" className="footer-link" draggable={false}>
                  Contact
                </a>
              </div>
            </div>
            <div className="footer-section">
              <div className="footer-title">Connect</div>
              <div className="social-links">
                <a
                  href="mailto:se7endays.official@gmail.com"
                  className="social-link"
                  aria-label="Email"
                  draggable={false}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@se7endays.studio?lang=en"
                  className="social-link"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@SE7ENDAYS.studio"
                  className="social-link"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/zePJBTFu6N"
                  className="social-link"
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2026 SE7ENDAYS Studio. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
