import { useLocale } from '../i18n/LocaleContext'

export function Contact() {
  const { t } = useLocale()
  const { profile, ui } = t

  return (
    <section id="contact" className="section">
      <h2 className="display display-sm">{ui.contactTitle}</h2>
      <p className="lede">{ui.contactLede}</p>

      <div className="contact-grid">
        <a className="contact-tile" href={`mailto:${profile.email}`}>
          <span className="muted tiny">{ui.email}</span>
          <strong>{profile.email}</strong>
        </a>
        <a className="contact-tile" href={profile.github} target="_blank" rel="noreferrer">
          <span className="muted tiny">{ui.github}</span>
          <strong>{profile.github.replace(/^https?:\/\//, '')}</strong>
        </a>
        <a className="contact-tile" href={profile.linkedin} target="_blank" rel="noreferrer">
          <span className="muted tiny">{ui.linkedin}</span>
          <strong>{profile.linkedin.replace(/^https?:\/\//, '')}</strong>
        </a>
        {profile.resumeUrl ? (
          <a className="contact-tile" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <span className="muted tiny">{ui.resume}</span>
            <strong>{ui.openPdf}</strong>
          </a>
        ) : null}
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="foot">
      <span>{t.profile.name}</span>
      <a href="#query">{t.ui.top}</a>
    </footer>
  )
}
