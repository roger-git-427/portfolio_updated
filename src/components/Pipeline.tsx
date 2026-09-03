import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import type { Project, StageId } from '../i18n/types'

function ProjectDag({ project }: { project: Project }) {
  const { t } = useLocale()
  const [active, setActive] = useState<StageId>('evaluate')
  const body = project.stages[active]
  const activeStage = t.stages.find((s) => s.id === active)

  return (
    <article className="job">
      <header className="job-head">
        <div>
          <p className="job-id">{project.id}</p>
          <h3>{project.name}</h3>
          <p className="job-tagline">{project.tagline}</p>
        </div>
        <div className="job-meta">
          <div className="metric">
            <span>{project.metric.label}</span>
            <strong>{project.metric.value}</strong>
          </div>
          {project.github ? (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              {project.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')} ↗
            </a>
          ) : null}
          {project.demo ? (
            <a className="text-link" href={project.demo}>
              {t.ui.demo} ↗
            </a>
          ) : null}
        </div>
      </header>

      <div className="job-facts">
        <div>
          <span>{t.ui.problem}</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span>{t.ui.whatShipped}</span>
          <p>{project.result}</p>
        </div>
      </div>

      <ol className="dag">
        {t.stages.map((s, i) => (
          <li key={s.id} className="dag-item">
            {i > 0 && (
              <span className="edge" aria-hidden>
                <span className="edge-fill" />
              </span>
            )}
            <button
              type="button"
              className={`node ${active === s.id ? 'is-active' : ''}`}
              onClick={() => setActive(s.id)}
              aria-pressed={active === s.id}
            >
              <span className="node-dot" />
              <span className="node-label">{s.label}</span>
              <span className="node-hint">{s.hint}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="stage-panel">
        <div className="stage-kicker">
          <span className="pip pip-live" />
          {activeStage?.label ?? active}
        </div>
        <p>{body}</p>
        <div className="chips">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Pipeline() {
  const { t } = useLocale()

  return (
    <section id="pipeline" className="section">
      <h2 className="display display-sm">{t.ui.workTitle}</h2>
      <p className="lede">{t.ui.workLede}</p>
      <div className="jobs">
        {t.projects.map((p) => (
          <ProjectDag key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
