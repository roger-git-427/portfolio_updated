import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import { highlightSql } from '../lib/highlightSql'
import {
  defaultSql,
  getSchema,
  runQuery,
  type QueryResult,
} from '../lib/query'

type Props = {
  onScrollTo?: (id: string) => void
}

export function QueryWorkbench({ onScrollTo }: Props) {
  const { t, locale } = useLocale()
  const [sql, setSql] = useState(defaultSql)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [running, setRunning] = useState(false)
  const sqlRef = useRef(sql)
  const tRef = useRef(t)
  const onScrollToRef = useRef(onScrollTo)
  sqlRef.current = sql
  tRef.current = t
  onScrollToRef.current = onScrollTo

  const schema = useMemo(() => getSchema(t), [t])
  const highlighted = useMemo(() => highlightSql(sql), [sql])
  const lines = Math.max(4, sql.split('\n').length)

  function execute(next = sql, scroll = true) {
    setRunning(true)
    window.setTimeout(() => {
      const out = runQuery(next, tRef.current)
      setResult(out)
      setRunning(false)
      if (scroll && out.ok && out.scrollTo) onScrollToRef.current?.(out.scrollTo)
    }, 180)
  }

  function loadTable(name: string) {
    const next = `SELECT * FROM ${name};`
    setSql(next)
    execute(next)
  }

  useEffect(() => {
    setResult(runQuery(defaultSql, t))
  }, [locale, t])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        execute(sqlRef.current)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const lineNos = Array.from({ length: lines }, (_, i) => i + 1)
  const status = running
    ? t.ui.statusRunning
    : result
      ? t.ui.statusOk
      : t.ui.statusReady

  return (
    <section id="query" className="section query-section">
      <p className="brand">{t.profile.name}</p>
      <h1 className="display">{t.profile.role}</h1>
      <p className="lede">
        {t.profile.oneLiner}{' '}
        <a className="skip" href="#pipeline">
          {t.ui.projectsLink}
        </a>
      </p>

      <div className="workbench">
        <div className="wb-chrome">
          <span className="wb-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="wb-title">{t.ui.queryTitle}</span>
          <span className={`wb-status ${running ? 'is-run' : result ? 'is-ok' : ''}`}>
            {status}
          </span>
        </div>

        <div className="wb-body">
          <aside className="schema">
            <div className="schema-head">{t.ui.tables}</div>
            <ul>
              {schema.map((table) => (
                <li key={table.name}>
                  <button type="button" onClick={() => loadTable(table.name)}>
                    <span className="tbl-icon">▸</span>
                    <span>
                      <strong>{table.name}</strong>
                      <small>{table.comment}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="editor-col">
            <div className="editor" style={{ ['--lines' as string]: lines }}>
              <div className="gutter" aria-hidden>
                {lineNos.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <div className="editor-stack">
                <pre
                  className="hl"
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
                />
                <textarea
                  value={sql}
                  spellCheck={false}
                  aria-label={t.ui.sqlEditorLabel}
                  onChange={(e) => setSql(e.target.value)}
                />
              </div>
            </div>

            <div className="editor-actions">
              <span className="muted tiny">{t.ui.sqlHint}</span>
              <button
                type="button"
                className="run"
                onClick={() => execute()}
                disabled={running}
              >
                <span className="run-glyph">▶</span>
                {t.ui.run}
                <kbd>ctrl ↵</kbd>
              </button>
            </div>
          </div>
        </div>

        <div className="results" aria-live="polite">
          {!result && <p className="results-empty">{t.ui.resultsEmpty}</p>}
          {result && !result.ok && (
            <div className="sql-err">
              <div className="sql-err-label">{t.ui.errorLabel}</div>
              <p>{result.message}</p>
              {result.hint && (
                <p className="hint">
                  {t.ui.hintLabel}: {result.hint}
                </p>
              )}
            </div>
          )}
          {result?.ok && (
            <>
              <div className="results-meta">
                <span>
                  {result.rows.length}{' '}
                  {result.rows.length === 1 ? t.ui.row : t.ui.rows}
                </span>
                <span>{result.ms} ms</span>
                {result.hint && <span className="hint-inline">{result.hint}</span>}
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {result.columns.map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
