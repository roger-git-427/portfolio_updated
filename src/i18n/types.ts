export type Locale = 'en' | 'es'

export type StageId = 'ingest' | 'transform' | 'train' | 'evaluate' | 'serve'

export type Project = {
  id: string
  name: string
  tagline: string
  problem: string
  result: string
  stack: string[]
  github?: string
  demo?: string
  metric: { label: string; value: string }
  stages: Record<StageId, string>
}

export type Content = {
  profile: {
    name: string
    handle: string
    role: string
    oneLiner: string
    recentWork: string
    location: string
    email: string
    github: string
    linkedin: string
    resumeUrl: string
  }
  about: {
    summary: string
    background: string
    canDo: string[]
  }
  skills: {
    data: string[]
    models: string[]
    serve: string[]
  }
  skillDomains: {
    data: string
    models: string
    serve: string
  }
  stages: { id: StageId; label: string; hint: string }[]
  projects: Project[]
  ui: {
    navAbout: string
    navWork: string
    navContact: string
    projectsLink: string
    aboutTitle: string
    aboutHeading: string
    recentWork: string
    whatICanDo: string
    skillsTitle: string
    workTitle: string
    workLede: string
    problem: string
    whatShipped: string
    demo: string
    contactTitle: string
    contactLede: string
    email: string
    github: string
    linkedin: string
    resume: string
    openPdf: string
    top: string
    queryTitle: string
    tables: string
    run: string
    sqlHint: string
    sqlEditorLabel: string
    statusReady: string
    statusRunning: string
    statusOk: string
    resultsEmpty: string
    errorLabel: string
    hintLabel: string
    row: string
    rows: string
    schemaProfile: string
    schemaWork: string
    schemaSkills: string
    schemaContact: string
    schemaAbout: string
  }
  query: {
    empty: string
    emptyHint: string
    helpHint: string
    helpRows: [string, string][]
    permissionDenied: string
    permissionHint: string
    readOnly: string
    readOnlyHint: string
    selectNeedsFrom: string
    engineerHint: string
    projectsHint: string
  }
}
