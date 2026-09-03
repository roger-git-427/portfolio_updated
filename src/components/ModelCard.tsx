import { useLocale } from '../i18n/LocaleContext'

export function ModelCard() {
  const { t } = useLocale()
  const { profile, about, skills, skillDomains, ui } = t

  return (
    <section id="model-card" className="section">
      <h2 className="display display-sm">{ui.aboutTitle}</h2>
      <p className="lede">{profile.oneLiner}</p>

      <article className="card paper">
        <div className="card-grid">
          <div>
            <h3>{ui.aboutHeading}</h3>
            <p>{about.summary}</p>
          </div>
          <div>
            <h3>{ui.recentWork}</h3>
            <p>{about.background}</p>
          </div>
        </div>

        <h3>{ui.whatICanDo}</h3>
        <ul className="ticks">
          {about.canDo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3>{ui.skillsTitle}</h3>
        <div className="skill-rows">
          {(
            Object.keys(skills) as Array<keyof typeof skills>
          ).map((domain) => (
            <div key={domain} className="skill-row">
              <span className="skill-domain">{skillDomains[domain]}</span>
              <div className="chips">
                {skills[domain].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
