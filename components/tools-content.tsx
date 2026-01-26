"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, Code, MessageSquareOff, Lock } from "lucide-react"

const tools = [
  {
    id: "addon-generator",
    title: "MCADDON Generator",
    description: "Create professional Minecraft Bedrock add-on structures with proper manifests and folder organization.",
    icon: Package,
    href: "/tools/addon-generator",
    locked: false,
  },
  {
    id: "bedrock-encoder",
    title: "Bedrock Encoder",
    description: "Professional code protection for your Minecraft add-ons with advanced obfuscation.",
    icon: Code,
    href: "/tools/bedrock-encoder",
    locked: false,
  },
  {
    id: "comment-remover",
    title: "Comment Remover",
    description: "Remove all comments from your code files to reduce file size and protect your logic.",
    icon: MessageSquareOff,
    href: "/tools/comment-remover",
    locked: true,
  },
]

export function ToolsContent() {
  const [scrolled, setScrolled] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in via localStorage
    const loggedIn = localStorage.getItem("team_logged_in") === "true"
    if (!loggedIn) {
      router.push("/")
      return
    }
    setIsAuthorized(true)
    setIsChecking(false)
  }, [router])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Show loading while checking auth
  if (isChecking || !isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="tools-page">
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="logo" draggable={false}>
            <Image
              src="/images/s7d_logo_white.png"
              alt=""
              width={40}
              height={40}
              className="logo-icon"
              draggable={false}
            />
            SE7ENDAYS Studio
          </Link>
          <div className="nav-links">
            <Link href="/#work" className="nav-link" draggable={false}>
              Work
            </Link>
            <Link href="/#team" className="nav-link" draggable={false}>
              Team
            </Link>
            <Link href="/#contact" className="nav-link" draggable={false}>
              Contact
            </Link>
            <Link href="/tools" className="nav-link nav-tools">
              Tools
            </Link>
          </div>
        </div>
      </nav>

      <main className="tools-main">
        <div className="tools-container">
          <div className="tools-header">
            <div className="tools-label">Developer Tools</div>
            <h1 className="tools-title">Team Toolkit</h1>
            <p className="tools-desc">
              Internal tools for the SE7ENDAYS development team. Build, encode, and optimize your Minecraft add-ons.
            </p>
          </div>

          <div className="tools-grid">
            {tools.map((tool) => {
              const Icon = tool.icon
              return tool.locked ? (
                <div key={tool.id} className="tool-card tool-card-locked">
                  <div className="tool-icon">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="tool-card-title">{tool.title}</h3>
                  <p className="tool-card-desc">{tool.description}</p>
                  <div className="tool-locked-badge">
                    <Lock className="w-4 h-4" />
                    <span>Coming Soon</span>
                  </div>
                </div>
              ) : (
                <Link key={tool.id} href={tool.href} className="tool-card">
                  <div className="tool-icon">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="tool-card-title">{tool.title}</h3>
                  <p className="tool-card-desc">{tool.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="footer">
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
                <Link href="/#work" className="footer-link" draggable={false}>
                  Work
                </Link>
                <Link href="/#team" className="footer-link" draggable={false}>
                  Team
                </Link>
                <Link href="/#contact" className="footer-link" draggable={false}>
                  Contact
                </Link>
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
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

      <style jsx>{`
        .tools-page {
          min-height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
        }

        .tools-main {
          flex: 1;
          padding: 120px 32px 80px;
        }

        .tools-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tools-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .tools-label {
          font-size: 13px;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 16px;
        }

        .tools-title {
          font-size: 48px;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .tools-desc {
          font-size: 18px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .tool-card {
          background: #f9f9f9;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          padding: 40px 32px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
        }

        .tool-card:not(.tool-card-locked):hover {
          background: #f0f0f0;
          border-color: #d5d5d5;
          transform: translateY(-4px);
        }

        .tool-card-locked {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tool-icon {
          width: 64px;
          height: 64px;
          background: #e5e5e5;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .tool-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .tool-card-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .tool-locked-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #e5e5e5;
          border-radius: 20px;
          color: #888;
          font-size: 12px;
          font-weight: 600;
          margin-top: auto;
        }

        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .tools-main {
            padding: 100px 24px 60px;
          }

          .tools-title {
            font-size: 36px;
          }

          .tools-desc {
            font-size: 16px;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
