import { Contact, Footer } from './components/Contact'
import { ModelCard } from './components/ModelCard'
import { Nav } from './components/Nav'
import { Pipeline } from './components/Pipeline'
import { QueryWorkbench } from './components/QueryWorkbench'
import { LocaleProvider } from './i18n/LocaleContext'

export default function App() {
  function scrollTo(id: string) {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <LocaleProvider>
      <div className="shell">
        <div className="grid-bg" aria-hidden />
        <Nav />
        <main>
          <QueryWorkbench onScrollTo={scrollTo} />
          <ModelCard />
          <Pipeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  )
}
