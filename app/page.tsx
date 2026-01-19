import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"
import { DisableInspect } from "@/components/disable-inspect"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] overflow-x-hidden">
      <DisableInspect />
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <StatsSection />
      <TeamSection />
      <Footer />
    </main>
  )
}
