const KEYWORDS =
  /\b(select|from|where|and|or|not|as|on|join|left|right|inner|outer|group|order|by|limit|offset|insert|into|values|update|set|delete|create|table|show|tables|describe|desc|with|union|case|when|then|else|end|distinct|having|in|is|null|like|between|array|skills)\b/gi
const TYPES = /\b(text|int|varchar|bool|timestamp)\b/gi
const STRINGS = /'[^']*'|"[^"]*"/g
const NUMBERS = /\b\d+(\.\d+)?\b/g
const COMMENTS = /--[^\n]*/g

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function highlightSql(sql: string) {
  const used = new Array(sql.length).fill(false)
  const located: { i: number; t: string; kind: string }[] = []

  const collect = (re: RegExp, kind: string) => {
    const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`)
    for (const m of sql.matchAll(r)) {
      const i = m.index ?? 0
      if (used.slice(i, i + m[0].length).some(Boolean)) continue
      for (let k = 0; k < m[0].length; k++) used[i + k] = true
      located.push({ i, t: m[0], kind })
    }
  }

  collect(COMMENTS, 'cmt')
  collect(STRINGS, 'str')
  collect(KEYWORDS, 'kw')
  collect(TYPES, 'typ')
  collect(NUMBERS, 'num')
  located.sort((a, b) => a.i - b.i)

  let html = ''
  let cursor = 0
  for (const p of located) {
    if (p.i > cursor) html += esc(sql.slice(cursor, p.i))
    html += `<span class="tok-${p.kind}">${esc(p.t)}</span>`
    cursor = p.i + p.t.length
  }
  if (cursor < sql.length) html += esc(sql.slice(cursor))
  return html
}
