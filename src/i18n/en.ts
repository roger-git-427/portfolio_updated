import type { Content } from './types'

export const en: Content = {
  profile: {
    name: 'Rogelio Lizarraga',
    handle: 'rogelio',
    role: 'AI & Data Engineer',
    oneLiner:
      'I take labeled data, put it in a warehouse with a documented grain, train a model on a leak-safe split, and serve predictions a reviewer can inspect.',
    recentWork:
      'CXR AI Analyzer and a CFPB lakehouse — both below.',
    location: 'Tijuana, Baja California · willing to relocate',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'Based in Tijuana; open to remote or relocate. B.S. in Data Science and Mathematics at Tecnológico de Monterrey (minor in Advanced AI). Now Data Manager at a geomatics company — flight data into S3 and a NAS, Azure/PostgreSQL, reporting. I look for AI and data engineering roles where a person still has to trust the score.',
    background:
      'Two systems on this page: CXR AI Analyzer for chest X-ray screening, and a CFPB complaint lakehouse with a product classifier, MiniLM search, and guarded SQL.',
    canDo: [
      'Model the grain of a dataset, build bronze → silver → gold, and query it in SQL.',
      'Train under imbalance and leakage constraints (patient-level splits, time splits, class weights).',
      'Report the metric that would actually be used: precision at a threshold, macro F1, confidence — not a single vanity score.',
      'Serve FastAPI and React so a reviewer sees the prediction, the score, and enough context to decide.',
    ],
  },
  skills: {
    data: ['SQL', 'Python', 'pandas', 'star schemas', 'PostgreSQL', 'DuckDB'],
    models: ['PyTorch', 'scikit-learn', 'MLflow', 'sentence-transformers'],
    serve: ['FastAPI', 'React', 'Docker'],
  },
  skillDomains: {
    data: 'data',
    models: 'models',
    serve: 'serve',
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
      id: 'cxrai',
      name: 'CXR AI Analyzer · chest X-ray screening',
      tagline:
        'Clinic screening for cardiomegaly and pleural effusion: ConvNeXt-Tiny, confidence, Grad-CAM, multi-clinic accounts.',
      problem:
        'A clinic needs a second pass on chest films for two common findings, with a score and a heatmap a clinician can agree or disagree with.',
      result:
        'Two binary specialists, trained with patient-level holdout and class-weighted loss, shipped in a Spanish multi-clinic app: confidence, Grad-CAM, PDF reports, session auth (master / admin / patient), and an audit trail. Decision support, not a diagnosis.',
      stack: ['PyTorch', 'timm', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/roger-git-427/chest_xray_AI',
      metric: { label: 'holdout', value: 'patient-level' },
      stages: {
        ingest:
          'Sourced from NIH ChestX-ray14, using the official patient-level training and test lists. Fourteen findings exist in the labels; the product ships two — cardiomegaly and pleural effusion — because they are visually distinct and common enough to evaluate. Weights load only when the checkpoint file is on disk. Images are not in the repo.',
        transform:
          'No patient appears in both the training and test sets, and each finding is a yes/no label. Both are rare, so the loss is class-weighted instead of rewarding a model that always predicts “no finding.” PNG, JPG, and DICOM all go through the same screening path.',
        train:
          'ConvNeXt-Tiny (timm), pretrained on ImageNet, trained as one binary classifier per finding under AdamW. The retained checkpoint is the one with the best validation ROC-AUC; both findings shipped once their classifiers cleared that bar.',
        evaluate:
          'Evaluated on held-out NIH test images, reported separately for each finding. ROC-AUC measures ranking quality; a confusion matrix captures the operating point. The UI shows a confidence score and flags a finding only above a per-condition threshold (0.3 cardiomegaly, 0.4 effusion). Precision at that threshold is the clinic question: when the system says review this, how often is it right?',
        serve:
          'Docker Compose runs Postgres, FastAPI, and nginx; local dev uses SQLite. A user opens a study and sees confidence for cardiomegaly and effusion, a Grad-CAM heatmap, and an exportable report. Clinics are isolated; roles are master, admin, and patient, with sessions and an audit trail. A licensed reader still interprets every image.',
      },
    },
    {
      id: 'cfpb-intelligence',
      name: 'Consumer complaint intelligence',
      tagline:
        'CFPB lakehouse on DuckDB: product classifier with a time holdout, MiniLM retrieval, and guarded text-to-SQL.',
      problem:
        'Complaints arrive as free text. Before a person reads the queue, the system should say which product the narrative is about — and how sure it is — without leaking later complaints into training. Analysts still need SQL on the warehouse, not only a classifier score.',
      result:
        'On later dates than training (Nov–Dec 2024): 0.80 accuracy, 0.80 weighted F1, 0.68 macro F1 on eight products. Mortgage and credit reporting hold; money transfer does not. FastAPI serves product + confidence, MiniLM similar-complaint search, and SELECT-only SQL on gold.',
      stack: ['Python', 'DuckDB', 'scikit-learn', 'MLflow', 'sentence-transformers', 'FastAPI'],
      github: 'https://github.com/roger-git-427/complaint_intelligence_v2.0',
      metric: { label: 'holdout', value: '0.80 acc · 0.68 macro F1' },
      stages: {
        ingest:
          'Landed from the CFPB Consumer Complaint Database via API, bulk zip, or a Hugging Face snapshot, then sliced to 2024 narratives (~8k rows). Grain is one complaint. The classifier sees only the narrative; company, issue, state, and date stay in the warehouse for SQL.',
        transform:
          'Bronze is parquet as landed. Silver types dates, maps yes/no flags, and dedupes on complaint_id. Gold is a star schema (fact_complaints; company, product, issue, geo, channel, date). Quality checks uniqueness and company foreign keys. Products with fewer than 40 rows are dropped. After sorting by date_received, the last 20% is holdout — later complaints never train.',
        train:
          'TF-IDF (unigrams and bigrams, 40k features) feeding a class-weighted logistic regression, tracked in MLflow. The retained product run is the one scored on later dates, not a shuffle of the same weeks. Training also fits a timely-response head (weak signal from narrative alone) and builds a MiniLM embedding index over silver, with TF-IDF as fallback.',
        evaluate:
          'Held-out later dates (2024-11-19 → 2024-12-24): accuracy 0.80, weighted F1 0.80, macro F1 0.68. Mortgage F1 0.89 and credit reporting 0.86; money transfer 0.29. The timely-response model is 0.81 ROC-AUC and 0.50 macro F1 — accuracy looks high because almost every response is timely, so it is not the headline number. Each product call returns confidence and ranked alternatives.',
        serve:
          'FastAPI: /predict returns product, confidence, and alternatives; /search finds similar complaints with MiniLM; /sql and /chat compile analytic questions to DuckDB on gold. An optional LLM SQL still has to pass a SELECT-only guard (no DML/DDL, no multi-statement). Docker Compose serves the API over the gold parquet and trained artifacts. The model routes the complaint; a person closes the case.',
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
      'Open to AI and data engineering roles. Email or GitHub is the fastest way to reach me.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Resume',
    openPdf: 'Open PDF',
    top: 'Top',
    queryTitle: 'Query',
    tables: 'Tables',
    run: 'Run',
    sqlHint: 'SHOW TABLES · SELECT * FROM projects · HELP',
    sqlEditorLabel: 'SQL editor',
    statusReady: 'ready',
    statusRunning: 'running',
    statusOk: 'idle — last query succeeded',
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
    engineerHint: 'SELECT * FROM projects;  — the two systems below',
    projectsHint:
      'Open a project in the pipeline for problem, split, metric, and serving.',
  },
}