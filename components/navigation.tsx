"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-[30px] border-b transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(26,26,26,0.98)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-white/10"
          : "bg-[rgba(26,26,26,0.95)] border-white/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 h-16 md:h-20 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-3 group">
          <Image
            src="/images/s7d_logo_white.png"
            alt="S7D Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <span className="text-lg md:text-[22px] font-extrabold text-white tracking-[-0.03em] relative">
            SE7ENDAYS Studio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        <div className="flex gap-6 md:gap-12 items-center">
          {["Work", "Team", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 text-sm md:text-[15px] font-medium tracking-[-0.01em] relative hover:text-white transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
