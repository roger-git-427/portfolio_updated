import type { Content } from '../i18n/types'

export type Cell = string
export type QueryOk = {
  ok: true
  statement: string
  columns: string[]
  rows: Cell[][]
  ms: number
  scrollTo?: string
  hint?: string
}
export type QueryErr = {
  ok: false
  statement: string
  message: string
  hint?: string
}
export type QueryResult = QueryOk | QueryErr

type Table = {
  columns: string[]
  rows: Cell[][]
  scrollTo?: string
  comment: string
}

function getTables(t: Content): Record<string, Table> {
  const { profile, about, projects, skills, ui } = t
  return {
    engineer: {
      comment: ui.schemaProfile,
      scrollTo: 'model-card',
      columns: ['name', 'role', 'recent_work', 'location'],
      rows: [
        [
          profile.name,
          profile.role,
          profile.recentWork,
          profile.location,
        ],
      ],
    },
    projects: {
      comment: ui.schemaWork,
      scrollTo: 'pipeline',
      columns: ['id', 'name', 'tagline', 'stack', 'metric'],
      rows: projects.map((p) => [
        p.id,
        p.name,
        p.tagline,
        p.stack.join(', '),
        `${p.metric.label}: ${p.metric.value}`,
      ]),
    },
    skills: {
      comment: ui.schemaSkills,
      scrollTo: 'model-card',
      columns: ['domain', 'name'],
      rows: [
        ...skills.data.map((s) => [t.skillDomains.data, s]),
        ...skills.models.map((s) => [t.skillDomains.models, s]),
        ...skills.serve.map((s) => [t.skillDomains.serve, s]),
      ],
    },
    contact: {
      comment: ui.schemaContact,
      scrollTo: 'contact',
      columns: ['channel', 'value'],
      rows: [
        ['email', profile.email],
        ['github', profile.github],
        ['linkedin', profile.linkedin],
      ],
    },
    model_card: {
      comment: ui.schemaAbout,
      scrollTo: 'model-card',
      columns: ['section', 'summary'],
      rows: [
        ['about', about.summary],
        ['recent_work', about.background],
        ['what_i_can_do', about.canDo.join(' ')],
      ],
    },
  }
}

export function getSchema(t: Content) {
  return [
    {
      name: 'engineer',
      comment: t.ui.schemaProfile,
      columns: ['name', 'role', 'recent_work', 'location'],
    },
    {
      name: 'projects',
      comment: t.ui.schemaWork,
      columns: ['id', 'name', 'tagline', 'stack', 'metric'],
    },
    {
      name: 'skills',
      comment: t.ui.schemaSkills,
      columns: ['domain', 'name'],
    },
    {
      name: 'contact',
      comment: t.ui.schemaContact,
      columns: ['channel', 'value'],
    },
    {
      name: 'model_card',
      comment: t.ui.schemaAbout,
      columns: ['section', 'summary'],
    },
  ]
}

function strip(sql: string) {
  return sql
    .replace(/--.*$/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/;+$/, '')
}

function err(statement: string, message: string, hint?: string): QueryErr {
  return { ok: false, statement, message, hint }
}

function ok(
  statement: string,
  table: Table,
  columns: string[],
  rows: Cell[][],
): QueryOk {
  return {
    ok: true,
    statement,
    columns,
    rows,
    ms: 4 + Math.floor(Math.random() * 18),
    scrollTo: table.scrollTo,
  }
}

export function runQuery(raw: string, t: Content): QueryResult {
  const TABLES = getTables(t)
  const statement = strip(raw)
  const q = statement.toLowerCase()
  const messages = t.query

  if (!statement) {
    return err(raw, messages.empty, messages.emptyHint)
  }

  if (/^help$|^\\h$|^\\?$/.test(q)) {
    return {
      ok: true,
      statement,
      columns: ['command', 'meaning'],
      rows: messages.helpRows,
      ms: 3,
      hint: messages.helpHint,
    }
  }

  if (/^show tables$|^\\dt$/.test(q)) {
    return {
      ok: true,
      statement,
      columns: ['schema', 'name', 'rows', 'comment'],
      rows: Object.entries(TABLES).map(([name, table]) => [
        'public',
        name,
        String(table.rows.length),
        table.comment,
      ]),
      ms: 6,
      hint: 'DESCRIBE engineer',
    }
  }

  const desc = q.match(/^(?:describe|desc|\\d)\s+(\w+)$/)
  if (desc) {
    const name = desc[1]
    const table = TABLES[name]
    if (!table) {
      return err(statement, `relation "${name}" does not exist`, 'SHOW TABLES')
    }
    return {
      ok: true,
      statement,
      columns: ['column', 'type'],
      rows: table.columns.map((c) => [c, 'text']),
      ms: 5,
      scrollTo: table.scrollTo,
    }
  }

  if (/^drop table/.test(q)) {
    return err(statement, messages.permissionDenied, messages.permissionHint)
  }

  if (/^insert into/.test(q) || /^update /.test(q) || /^delete /.test(q)) {
    return err(statement, messages.readOnly, messages.readOnlyHint)
  }

  if (!/^select\s/.test(q)) {
    return err(
      statement,
      `syntax error at or near "${statement.slice(0, 28)}"`,
      'SELECT * FROM engineer;  |  SHOW TABLES  |  HELP',
    )
  }

  const from = statement.match(/\bfrom\s+(\w+)/i)
  if (!from) {
    return err(statement, messages.selectNeedsFrom, 'SELECT * FROM projects;')
  }

  const tableName = from[1].toLowerCase()
  const table = TABLES[tableName]
  if (!table) {
    return err(
      statement,
      `relation "${from[1]}" does not exist`,
      `available: ${Object.keys(TABLES).join(', ')}`,
    )
  }

  const selectList = statement
    .replace(/\bfrom\s[\s\S]+$/i, '')
    .replace(/^select\s+/i, '')
    .trim()

  let columns = table.columns
  let rows = table.rows

  if (selectList !== '*') {
    const wanted = selectList.split(',').map((c) =>
      c
        .trim()
        .split(/\s+as\s+/i)
        .pop()!
        .replace(/["'`]/g, '')
        .toLowerCase(),
    )
    const idx: number[] = []
    for (const col of wanted) {
      const i = table.columns.findIndex((c) => c === col)
      if (i === -1) {
        return err(
          statement,
          `column "${col}" does not exist on ${tableName}`,
          `columns: ${table.columns.join(', ')}`,
        )
      }
      idx.push(i)
    }
    columns = wanted.map((_, n) => table.columns[idx[n]])
    rows = table.rows.map((row) => idx.map((i) => row[i]))
  }

  const result = ok(statement, table, columns, rows)
  result.hint =
    tableName === 'engineer'
      ? messages.engineerHint
      : tableName === 'projects'
        ? messages.projectsHint
        : undefined
  return result
}

export const defaultSql = `SELECT name, role, recent_work
FROM engineer;`
