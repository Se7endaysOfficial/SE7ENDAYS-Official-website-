"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import JSZip from "jszip"

export function BedrockEncoderContent() {
  const [scrolled, setScrolled] = useState(false)
  const [packType, setPackType] = useState<"behavior" | "resource">("behavior")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [encodedBlob, setEncodedBlob] = useState<Blob | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFileSelect = (file: File) => {
    if (file.name.endsWith(".zip")) {
      setSelectedFile(file)
      setEncodedBlob(null)
      setProgress(0)
      setStatus("")
    } else {
      alert("Please select a .zip file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const encodeChar = (char: string) => {
    const code = char.charCodeAt(0)
    return "\\u" + code.toString(16).padStart(4, "0")
  }

  const encodeJSON = (code: string) => {
    let encoded = ""
    let inString = false
    let escapeNext = false
    let currentString = ""

    for (let i = 0; i < code.length; i++) {
      const char = code.charAt(i)

      if (escapeNext) {
        currentString += char
        escapeNext = false
        continue
      }

      if (char === "\\" && inString) {
        escapeNext = true
        currentString += char
        continue
      }

      if (char === '"') {
        if (!inString) {
          inString = true
          encoded += char
          currentString = ""
        } else {
          // Encode the string content
          for (const c of currentString) {
            if (c.charCodeAt(0) > 127 || /[a-zA-Z]/.test(c)) {
              encoded += encodeChar(c)
            } else {
              encoded += c
            }
          }
          encoded += char
          inString = false
        }
      } else if (inString) {
        currentString += char
      } else {
        encoded += char
      }
    }

    return encoded
  }

  const handleEncode = async () => {
    if (!selectedFile) return

    if (encodedBlob) {
      // Download existing encoded file
      const url = URL.createObjectURL(encodedBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `encoded_${selectedFile.name}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setStatus("Reading pack...")

    try {
      const zip = new JSZip()
      const content = await selectedFile.arrayBuffer()
      const loadedZip = await zip.loadAsync(content)

      const newZip = new JSZip()
      const files = Object.keys(loadedZip.files)
      let processed = 0

      for (const filename of files) {
        const file = loadedZip.files[filename]

        if (file.dir) {
          newZip.folder(filename)
        } else {
          const fileContent = await file.async("uint8array")

          // Check if it's a JSON file that should be encoded
          if (filename.endsWith(".json") && !filename.includes("manifest")) {
            setStatus(`Encoding ${filename}...`)
            const textContent = new TextDecoder().decode(fileContent)
            try {
              const encodedContent = encodeJSON(textContent)
              newZip.file(filename, encodedContent)
            } catch {
              // If encoding fails, keep original
              newZip.file(filename, fileContent)
            }
          } else {
            // Keep other files as-is
            newZip.file(filename, fileContent)
          }
        }

        processed++
        setProgress(Math.round((processed / files.length) * 100))
      }

      setStatus("Generating encoded pack...")
      const blob = await newZip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      })

      setEncodedBlob(blob)
      setStatus("Encoding complete!")
      setProgress(100)
      setIsProcessing(false)
    } catch (error) {
      console.error("Error encoding pack:", error)
      setStatus("Error encoding pack")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className={`nav nav-light ${scrolled ? "scrolled" : ""}`}>
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

      <main className="encoder-page">
        <div className="encoder-container">
          <div className="encoder-header">
            <Link href="/tools" className="back-link-dark">
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Link>
            <div className="page-label-dark">Developer Tools</div>
            <h1 className="page-title-dark">Bedrock Encoder</h1>
            <p className="page-desc-dark">
              Professional code protection for your Minecraft add-ons with advanced obfuscation.
            </p>
          </div>

          <div className="encoder-card">
            <div className="pack-selector">
              <button
                className={`pack-option ${packType === "behavior" ? "active" : ""}`}
                onClick={() => setPackType("behavior")}
              >
                Behavior Pack
              </button>
              <button
                className={`pack-option ${packType === "resource" ? "active" : ""}`}
                onClick={() => setPackType("resource")}
              >
                Resource Pack
              </button>
            </div>

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
              {selectedFile ? (
                <>
                  <div className="file-icon">📦</div>
                  <p className="primary-text">{selectedFile.name}</p>
                  <p className="secondary-text">Click to change file</p>
                </>
              ) : (
                <>
                  <div className="file-icon">📦</div>
                  <p className="primary-text">Drop your .zip file here or click to browse</p>
                  <p className="secondary-text">Select your pack to begin encoding</p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".zip"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleFileSelect(e.target.files[0])
                }
              }}
            />

            <button
              className="encode-btn"
              onClick={handleEncode}
              disabled={!selectedFile || isProcessing}
            >
              {encodedBlob ? "Download Encoded Pack" : isProcessing ? "Processing..." : "Encode Pack"}
            </button>

            {(isProcessing || progress > 0) && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                  <div className="progress-text">{progress}%</div>
                </div>
                <div className="status-text">{status}</div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .encoder-page {
          min-height: 100vh;
          padding: 120px 32px 80px;
          background: #fff;
        }

        .encoder-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .encoder-header {
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

        .encoder-card {
          background: #fff;
          padding: 48px 0;
        }

        .pack-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          padding: 8px;
          background: #f8f8f8;
          border-radius: 20px;
          border: 2px solid #e5e5e5;
        }

        .pack-option {
          flex: 1;
          padding: 14px 24px;
          border: none;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          color: #666;
          text-align: center;
        }

        .pack-option.active {
          background: #1a1a1a;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 26, 26, 0.2);
        }

        .pack-option:hover:not(.active) {
          background: #fff;
          color: #333;
        }

        .drop-zone {
          border: 3px dashed #e5e5e5;
          border-radius: 24px;
          padding: 64px 32px;
          text-align: center;
          background: #f8f8f8;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 24px;
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

        .encode-btn {
          width: 100%;
          padding: 18px 32px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(26, 26, 26, 0.15);
          letter-spacing: -0.01em;
        }

        .encode-btn:hover:not(:disabled) {
          background: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26, 26, 26, 0.25);
        }

        .encode-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .encode-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .progress-container {
          margin-top: 24px;
        }

        .progress-bar {
          width: 100%;
          height: 32px;
          background: #f8f8f8;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid #e5e5e5;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: #1a1a1a;
          position: absolute;
          top: 0;
          left: 0;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          z-index: 1;
          mix-blend-mode: difference;
        }

        .status-text {
          margin-top: 12px;
          text-align: center;
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .encoder-page {
            padding: 100px 24px 60px;
          }

          .page-title-dark {
            font-size: 36px;
          }

          .page-desc-dark {
            font-size: 16px;
          }

          .encoder-card {
            padding: 32px 0;
          }
        }
      `}</style>
    </div>
  )
}
