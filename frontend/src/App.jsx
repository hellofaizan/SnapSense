import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import StatsBar from './components/StatsBar'
import ProjectIdea from './components/ProjectIdea'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import PreFooter from './components/PreFooter'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950">
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <StatsBar />
        <ProjectIdea />
        <Features />
        <HowItWorks />
        <UseCases />
        <PreFooter />
      </main>
      <Footer />
    </div>
  )
}
