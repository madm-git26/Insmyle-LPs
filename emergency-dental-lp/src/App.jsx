import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14]">
      {/* ambient background — static, so it costs one paint */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,.22),transparent_65%)]" />
        <div className="absolute -left-40 top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.13),transparent_66%)]" />
        <div className="absolute -right-32 top-24 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.10),transparent_66%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(147,197,253,.05),transparent_11%),radial-gradient(circle_at_74%_16%,rgba(147,197,253,.045),transparent_9%),radial-gradient(circle_at_58%_62%,rgba(147,197,253,.04),transparent_8%)]" />
      </div>

      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Services />
        </main>
      </div>
    </div>
  )
}
