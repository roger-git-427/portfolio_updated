import type { Content } from './types'

export const en: Content = {
  profile: {
    name: 'Rogelio Lizarraga Escobar',
    handle: 'rogelio',
    role: 'AI & Data Engineer',
    oneLiner:
      'I take operational data, build the pipeline around it, train on a leak-safe split, and serve results a person can inspect and use.',
    recentWork: 'Data Manager at Desarrollo Geomatico, Aug 2025 to Sep 2026.',
    location: 'Tijuana, Baja California, willing to relocate',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'Based in Tijuana; open to remote or relocate. B.S. in Data Science and Mathematics Engineering at Tecnológico de Monterrey, Campus Monterrey (GPA 4.0; minor in Advanced AI), completed in 2025. Most recently Data Manager at a geomatics company: DJI flight data into S3 and a NAS, Azure/PostgreSQL, reporting, and flight-to-station optimization. Native Spanish, English C1, basic French. I look for AI and data engineering roles where a person still has to trust the result.',
    background:
      'From Aug 2025 to Sep 2026, I managed flight data and infrastructure at Desarrollo Geomatico. Before that, I built hotel occupancy forecasting with TCA Software Solutions, shelf-item detection for OXXO FEMSA, and new-product performance forecasting with Arca Continental.',
    canDo: [
      'Build idempotent intake, change-data capture, scheduled orchestration, and reconciliation gates around operational data.',
      'Model the grain of a dataset, build bronze → silver → gold, and query it in SQL.',
      'Train under imbalance and leakage constraints with chronological splits and class weights.',
      'Serve FastAPI checks and predictions with enough context for someone to decide what happens next.',
    ],
  },
  skills: {
    data: ['Python', 'SQL', 'PostgreSQL', 'DuckDB', 'MongoDB', 'Pandas', 'Airflow', 'n8n'],
    models: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost', 'MLflow', 'Optuna'],
    serve: ['Linux', 'Bash', 'Docker', 'GitHub Actions', 'FastAPI', 'AWS S3', 'MinIO', 'Azure'],
  },
  skillDomains: {
    data: 'data & orchestration',
    models: 'ML/DL',
    serve: 'infrastructure & serving',
  },
  stages: [
    { id: 'ingest', label: 'ingest', hint: 'sources and grain' },
    { id: 'transform', label: 'transform', hint: 'schema and labels' },
    { id: 'train', label: 'train', hint: 'model and selection' },
    { id: 'evaluate', label: 'evaluate', hint: 'metrics and thresholds' },
    { id: 'serve', label: 'serve', hint: 'deployed system' },
  ],
  projects: [
    {
      id: 'retail-forecasting',
      name: 'Retail data platform & demand forecasting',
      tagline:
        'Automated order intake, analytics, demand forecasting, and inventory-risk monitoring in one Dockerized platform.',
      problem:
        'Orders need to arrive once, stay reconciled across the pipeline, and turn into a next-day demand forecast before inventory becomes a problem.',
      result:
        'An idempotent n8n intake feeds PostgreSQL change-data capture and a scheduled seven-stage Airflow chain. A blocking reconciliation gate protects the run; FastAPI checks inventory and the model produces next-day forecasts and days-of-supply risk tiers.',
      stack: ['Airflow', 'n8n', 'XGBoost', 'PostgreSQL', 'FastAPI', 'Docker'],
      metric: { label: '30-day holdout', value: '-14.7% MAE, -20.4% RMSE' },
      stages: {
        ingest:
          'Orders enter through an idempotent n8n intake, so a retry does not create the same order twice. PostgreSQL change-data capture carries those changes into the rest of the platform.',
        transform:
          'A scheduled seven-stage Airflow chain prepares the data and stops at a blocking reconciliation gate when the records do not agree. CI tests the DAG contracts before they reach the pipeline.',
        train:
          'Leakage-safe SKU/day features feed a chronological XGBoost forecast. The split follows time, so future orders never help predict the past.',
        evaluate:
          'On the 30-day holdout, XGBoost reduced MAE by 14.7% and RMSE by 20.4% against persistence. Those are the errors the next-day forecast has to beat before it is useful.',
        serve:
          'The platform runs in Docker. FastAPI exposes inventory checks; the output is a next-day forecast plus days-of-supply risk tiers so the person reviewing stock can see where to act first.',
      },
    },
    {
      id: 'cfpb-intelligence',
      name: 'Consumer complaint intelligence',
      tagline:
        'CFPB lakehouse on DuckDB: product classifier with a time holdout, MiniLM retrieval, and guarded text-to-SQL.',
      problem:
        'Complaints arrive as free text. Before a person reads the queue, the system should say which product the narrative is about, and how sure it is, without leaking later complaints into training. Analysts still need SQL on the warehouse, not only a classifier score.',
      result:
        'On dates later than training: 0.80 accuracy and 0.68 macro F1. FastAPI serves ranked product predictions, MiniLM similar-complaint search, and guarded read-only text-to-SQL on gold.',
      stack: ['Python', 'DuckDB', 'scikit-learn', 'MLflow', 'sentence-transformers', 'FastAPI'],
      github: 'https://github.com/roger-git-427/complaint_intelligence_v2.0',
      metric: { label: 'holdout', value: '0.80 acc, 0.68 macro F1' },
      stages: {
        ingest:
          'CFPB complaint narratives land in a bronze layer with one complaint as the grain. The classifier sees the narrative; the rest of the complaint fields remain available for analytics.',
        transform:
          'Silver cleans and deduplicates the records; gold is a DuckDB star schema. Automated checks cover uniqueness, nulls, and foreign keys. After sorting by date, later complaints become the holdout and never train.',
        train:
          'Class-weighted TF-IDF feeds a logistic regression tracked in MLflow. A separate MiniLM index supports semantic search over similar complaint narratives.',
        evaluate:
          'On the chronological holdout, the product classifier reached 0.80 accuracy and 0.68 macro F1. The API returns ranked alternatives as well as the top prediction.',
        serve:
          'FastAPI serves ranked predictions, MiniLM semantic search, and text-to-SQL over gold. Generated SQL passes a read-only guard before it reaches DuckDB. The model routes the complaint; a person closes the case.',
      },
    },
  ],
  ui: {
    navAbout: 'About',
    navWork: 'Work',
    navContact: 'Contact',
    projectsLink: 'Projects',
    aboutTitle: 'About',
    aboutHeading: 'About',
    recentWork: 'Recent work',
    whatICanDo: 'What I can do',
    skillsTitle: 'Skills',
    workTitle: 'Work',
    workLede: 'Two systems. Each card has the problem, the holdout, and what shipped.',
    problem: 'Problem',
    whatShipped: 'What shipped',
    demo: 'demo',
    contactTitle: 'Contact',
    contactLede:
      'Open to AI and data engineering roles. Email or GitHub is the fastest way to reach me; phone: +52 667 185 0986.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Resume',
    openPdf: 'Open PDF',
    top: 'Top',
    queryTitle: 'Query',
    tables: 'Tables',
    run: 'Run',
    sqlHint: 'SHOW TABLES | SELECT * FROM projects | HELP',
    sqlEditorLabel: 'SQL editor',
    statusReady: 'ready',
    statusRunning: 'running',
    statusOk: 'idle, last query succeeded',
    resultsEmpty: 'Run the query, or select a table from the schema.',
    errorLabel: 'ERROR',
    hintLabel: 'HINT',
    row: 'row',
    rows: 'rows',
    schemaProfile: 'profile',
    schemaWork: 'selected work',
    schemaSkills: 'technical skills',
    schemaContact: 'contact channels',
    schemaAbout: 'about',
  },
  query: {
    empty: 'Empty query.',
    emptyHint: 'Try SELECT * FROM engineer;',
    helpHint: 'Read-only.',
    helpRows: [
      ['SHOW TABLES', 'list relations'],
      ['DESCRIBE engineer', 'columns on a relation'],
      ['SELECT * FROM engineer', 'open the about section'],
      ['SELECT * FROM projects', 'open selected work'],
      ['SELECT * FROM contact', 'open contact'],
    ],
    permissionDenied: 'Permission denied. Read-only.',
    permissionHint: 'Use SELECT * FROM contact;',
    readOnly: 'This page is read-only in the browser.',
    readOnlyHint: 'Use the contact section below.',
    selectNeedsFrom: 'SELECT needs a FROM',
    engineerHint: 'SELECT * FROM projects;  the two systems below',
    projectsHint:
      'Open a project in the pipeline for problem, split, metric, and serving.',
  },
}
