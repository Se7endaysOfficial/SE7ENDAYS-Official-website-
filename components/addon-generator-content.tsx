"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

import JSZip from "jszip"

export function AddonGeneratorContent() {
  const [scrolled, setScrolled] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const [packName, setPackName] = useState("")
  const [packDesc, setPackDesc] = useState("")
  const [packAuthor, setPackAuthor] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    localStorage.removeItem("team_logged_in")
    router.push("/")
  }

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

  const handleIconSelect = (file: File) => {
    if (file.type === "image/png") {
      setSelectedIcon(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select a PNG file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length) {
      handleIconSelect(e.dataTransfer.files[0])
    }
  }

  const generateUUID = () => {
    const hex = "0123456789abcdef"
    let uuid = ""
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += "-"
      } else if (i === 14) {
        uuid += "4"
      } else if (i === 19) {
        uuid += hex[Math.floor(Math.random() * 4) + 8]
      } else {
        uuid += hex[Math.floor(Math.random() * 16)]
      }
    }
    return uuid
  }

  const handleGenerate = async () => {
    if (!packName || !packDesc || !packAuthor) {
      alert("Please fill in all required fields")
      return
    }

    setIsGenerating(true)

    try {
      const zip = new JSZip()

      const bpUuid = generateUUID()
      const bpDataUuid = generateUUID()
      const bpScriptUuid = generateUUID()
      const rpUuid = generateUUID()
      const rpResourceUuid = generateUUID()

      const bpManifest = {
        format_version: 2,
        metadata: {
          product_type: "addon",
          authors: [packAuthor],
        },
        header: {
          name: "pack.name",
          description: "pack.description",
          min_engine_version: [1, 21, 80],
          uuid: bpUuid,
          pack_scope: "world",
          version: [1, 0, 0],
        },
        modules: [
          {
            type: "data",
            uuid: bpDataUuid,
            version: [1, 0, 0],
          },
          {
            type: "script",
            language: "javascript",
            uuid: bpScriptUuid,
            entry: "scripts/main.js",
            version: [1, 0, 0],
          },
        ],
        dependencies: [
          {
            uuid: rpUuid,
            version: [1, 0, 0],
          },
          {
            module_name: "@minecraft/server",
            version: "2.4.0",
          },
          {
            module_name: "@minecraft/server-ui",
            version: "2.0.0",
          },
        ],
      }

      const rpManifest = {
        format_version: 2,
        metadata: {
          product_type: "addon",
          authors: [packAuthor],
        },
        header: {
          name: "pack.name",
          description: "pack.description",
          min_engine_version: [1, 21, 80],
          uuid: rpUuid,
          pack_scope: "world",
          version: [1, 0, 0],
        },
        capabilities: ["pbr"],
        modules: [
          {
            type: "resources",
            uuid: rpResourceUuid,
            version: [1, 0, 0],
          },
        ],
        dependencies: [
          {
            uuid: bpUuid,
            version: [1, 0, 0],
          },
        ],
      }

      const mainJs = `import { world, system } from "@minecraft/server";\n\nsystem.runInterval(() => {\n    \n}, 1);`

      // Create BP folder
      const bpFolder = zip.folder(`${packName} BP`)
      if (bpFolder) {
        bpFolder.file("manifest.json", JSON.stringify(bpManifest, null, 2))

        if (selectedIcon) {
          const iconData = await selectedIcon.arrayBuffer()
          bpFolder.file("pack_icon.png", iconData)
        }

        const bpTextFolder = bpFolder.folder("texts")
        if (bpTextFolder) {
          bpTextFolder.file("en_US.lang", `pack.name=${packName}\npack.description=${packDesc}`)
          bpTextFolder.file("languages.json", JSON.stringify(["en_US"], null, 2))
        }

        bpFolder.folder("items")

        const scriptsFolder = bpFolder.folder("scripts")
        if (scriptsFolder) {
          scriptsFolder.file("main.js", mainJs)
        }
      }

      // Create RP folder
      const rpFolder = zip.folder(`${packName} RP`)
      if (rpFolder) {
        rpFolder.file("manifest.json", JSON.stringify(rpManifest, null, 2))

        if (selectedIcon) {
          const iconData = await selectedIcon.arrayBuffer()
          rpFolder.file("pack_icon.png", iconData)
        }

        const rpTextFolder = rpFolder.folder("texts")
        if (rpTextFolder) {
          rpTextFolder.file("en_US.lang", `pack.name=${packName}\npack.description=${packDesc}`)
          rpTextFolder.file("languages.json", JSON.stringify(["en_US"], null, 2))
        }
      }

      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${packName}.mcaddon`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setIsGenerating(false)
    } catch (error) {
      console.error("Error generating addon:", error)
      alert("Error generating addon")
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
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
            <Link href="/tools" className="nav-link">
              Tools
            </Link>
            <button onClick={handleLogout} className="nav-link nav-logout">
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <main className="generator-page">
        <div className="generator-container">
          <div className="generator-header">
            <div className="page-label-dark">Developer Tools</div>
            <h1 className="page-title-dark">MCADDON Generator</h1>
            <p className="page-desc-dark">
              Create professional Minecraft Bedrock add-on structures with proper manifests and
              folder organization.
            </p>
          </div>

          <div className="generator-card">
            <div className="form-group">
              <label className="form-label" htmlFor="packName">
                Add-on Name
              </label>
              <input
                type="text"
                id="packName"
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                placeholder="My Amazing Add-on"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="packDesc">
                Add-on Description
              </label>
              <textarea
                id="packDesc"
                value={packDesc}
                onChange={(e) => setPackDesc(e.target.value)}
                placeholder="Describe what your add-on does..."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="packAuthor">
                Author Name
              </label>
              <input
                type="text"
                id="packAuthor"
                value={packAuthor}
                onChange={(e) => setPackAuthor(e.target.value)}
                placeholder="Your name or studio name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pack Icon (PNG) - Optional</label>
              <div
                className={`drop-zone ${isDragOver ? "dragover" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                {iconPreview ? (
                  <>
                    <Image
                      src={iconPreview || "/placeholder.svg"}
                      alt="Icon preview"
                      width={64}
                      height={64}
                      className="icon-preview"
                    />
                    <p className="primary-text">Icon selected</p>
                    <p className="secondary-text">Click to change</p>
                  </>
                ) : (
                  <>
                    <div className="file-icon">🖼️</div>
                    <p className="primary-text">Drop your icon here or click to browse</p>
                    <p className="secondary-text">Recommended: 512x512 PNG</p>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".png"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleIconSelect(e.target.files[0])
                  }
                }}
              />
            </div>

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={!packName || !packDesc || !packAuthor || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate MCADDON"}
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="footer-logo" draggable={false}>
                <Image
                  src="/images/s7d_logo_white.png"
                  alt=""
                  width={32}
                  height={32}
                  className="footer-logo-icon"
                  draggable={false}
                />
                SE7ENDAYS Studio
              </Link>
              <p className="footer-tagline">Crafting digital experiences that inspire.</p>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <Link href="/#work">Work</Link>
              <Link href="/#team">Team</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <div className="footer-links">
              <h4>Connect</h4>
              <div className="social-links">
                <a
                  href="https://youtube.com/@SE7ENDAYS_Studio"
                  className="social-link"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/HQVp9rX3Sd"
                  className="social-link"
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
                <a
                  href="mailto:se7endays.official@gmail.com"
                  className="social-link"
                  aria-label="Email"
                  draggable={false}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SE7ENDAYS Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .generator-page {
          min-height: 100vh;
          padding: 120px 32px 80px;
          background: #fff;
        }

        .generator-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .generator-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .back-link-dark {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          transition: color 0.3s;
          text-decoration: none;
        }

        .back-link-dark:hover {
          color: #333;
        }

        .page-label-dark {
          font-size: 13px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 16px;
        }

        .page-title-dark {
          font-size: 48px;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .page-desc-dark {
          font-size: 18px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .generator-card {
          background: #fff;
          padding: 48px 0;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-label {
          display: block;
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 18px;
          background: #f8f8f8;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          color: #1a1a1a;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #1a1a1a;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.05);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #999;
        }

        .form-textarea {
          resize: none;
          min-height: 100px;
        }

        .drop-zone {
          border: 3px dashed #e5e5e5;
          border-radius: 20px;
          padding: 64px 32px;
          text-align: center;
          background: #f8f8f8;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .drop-zone:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }

        .drop-zone.dragover {
          background: #f0f0f0;
          border-color: #1a1a1a;
          transform: scale(1.02);
        }

        .file-icon {
          font-size: 56px;
          margin-bottom: 16px;
          opacity: 0.6;
        }

        .icon-preview {
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .primary-text {
          font-weight: 600;
          font-size: 16px;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .secondary-text {
          font-size: 14px;
          color: #666;
        }

        .generate-btn {
          width: 100%;
          padding: 18px 32px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(26, 26, 26, 0.15);
          letter-spacing: -0.01em;
          margin-top: 32px;
        }

        .generate-btn:hover:not(:disabled) {
          background: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26, 26, 26, 0.25);
        }

        .generate-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .generator-page {
            padding: 100px 24px 60px;
          }

          .page-title-dark {
            font-size: 36px;
          }

          .page-desc-dark {
            font-size: 16px;
          }

          .generator-card {
            padding: 32px 0;
          }
        }

        .footer {
          background: #0a0a0a;
          padding: 80px 48px 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 64px;
          margin-bottom: 64px;
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          margin-bottom: 16px;
        }

        .footer-logo-icon {
          border-radius: 8px;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links h4 {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s;
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-2px);
        }

        .social-link svg {
          width: 20px;
          height: 20px;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          text-align: center;
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 48px 24px 24px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </div>
  )
}
