"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { target: 1, suffix: "", label: "Year Experience" },
  { target: 100, suffix: "K+", label: "Downloads" },
  { target: 3, suffix: "", label: "Projects Created" },
  { target: 100, suffix: "%", label: "Custom Code" },
]

function AnimatedNumber({ target, suffix, animate }: { target: number; suffix: string; animate: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!animate) return

    const duration = 2000
    const increment = target / (duration / 16)
    let value = 0

    const update = () => {
      value += increment
      if (value >= target) {
        setCurrent(target)
        return
      }
      setCurrent(Math.floor(value))
      requestAnimationFrame(update)
    }

    update()
  }, [animate, target])

  return (
    <span className="text-[3.5rem] font-extrabold mb-3 tracking-[-0.04em] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
      {current}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animate) {
            setAnimate(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animate])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-[#1a1a1a] text-white py-16 md:py-20 px-5 md:px-16 relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 text-center relative z-[1]">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="cursor-default animate-fade-in-up flex flex-col items-center"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <AnimatedNumber target={stat.target} suffix={stat.suffix} animate={animate} />
            <div className="text-[0.9375rem] text-gray-400 font-medium tracking-[0.02em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
