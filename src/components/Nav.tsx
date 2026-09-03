import { useLocale } from '../i18n/LocaleContext'

export function Nav() {
  const { locale, setLocale, t } = useLocale()

  return (
    <header className="nav">
      <a className="nav-brand" href="#query">
        {t.profile.name}
      </a>
      <nav className="nav-links">
        <a href="#model-card">{t.ui.navAbout}</a>
        <a href="#pipeline">{t.ui.navWork}</a>
        <a href="#contact">{t.ui.navContact}</a>
        <div className="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            className={locale === 'en' ? 'is-active' : ''}
            onClick={() => setLocale('en')}
            aria-pressed={locale === 'en'}
          >
            EN
          </button>
          <span aria-hidden>/</span>
          <button
            type="button"
            className={locale === 'es' ? 'is-active' : ''}
            onClick={() => setLocale('es')}
            aria-pressed={locale === 'es'}
          >
            ES
          </button>
        </div>
      </nav>
    </header>
  )
}
