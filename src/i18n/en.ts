import type { Content } from './types'

export const en: Content = {
  profile: {
    name: 'Rogelio Lizarraga',
    handle: 'rogelio',
    role: 'AI & Data Engineer',
    oneLiner:
      'I take labeled data, put it in a warehouse with a documented grain, train a model on a leak-safe split, and serve predictions a reviewer can inspect.',
    recentWork:
      'ByteAI chest X-ray screening (cardiomegaly, pleural effusion) and a CFPB complaint warehouse with a product classifier',
    location: 'Remote',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'My work covers the full path from raw data to a served prediction: tables and transforms, a model evaluated honestly, and an API or UI that shows a score a human can act on. I am looking for AI and data engineering roles.',
    background:
      'Two finished systems follow that path. ByteAI screens chest X-rays for cardiomegaly and pleural effusion with ConvNeXt-Tiny, confidence, and Grad-CAM. The CFPB platform turns consumer complaints into a gold star schema and routes each narrative to a financial product with a time-based holdout.',
    canDo: [
      'Model the grain of a dataset, build bronze → silver → gold, and query it in SQL.',
      'Train under imbalance and leakage constraints (patient-level splits, time splits, class weights).',
      'Report the metric that would actually be used: precision at a threshold, macro F1, confidence — not a single vanity score.',
      'Serve FastAPI and React so a reviewer sees the prediction, the score, and enough context to decide.',
    ],
  },
  skills: {
    data: ['SQL', 'Python', 'pandas', 'star schemas', 'PostgreSQL', 'DuckDB'],
    models: ['PyTorch', 'scikit-learn', 'MLflow', 'evals'],
    serve: ['FastAPI', 'React'],
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
      id: 'byteai',
      name: 'ByteAI · chest X-ray screening',
      tagline:
        'Clinic screening for cardiomegaly and pleural effusion: ConvNeXt-Tiny, confidence, precision at a review threshold, Grad-CAM.',
      problem:
        'A clinic needs a second pass on chest films for two common findings, with a score and a heatmap a clinician can agree or disagree with.',
      result:
        'Two binary specialists, trained with patient-level holdout and class-weighted loss, shipped in a Spanish clinic UI with confidence scores, Grad-CAM, roles, and an audit trail. Decision support, not a diagnosis.',
      stack: ['PyTorch', 'timm', 'FastAPI', 'React', 'PostgreSQL'],
      github: 'https://github.com/roger-git-427/chest_xray_AI',
      metric: { label: 'holdout', value: 'patient-level' },
      stages: {
        ingest:
          'Sourced from NIH ChestX-ray14, using the official patient-level training and test lists. Fourteen findings exist in the labels; the product ships two — cardiomegaly and pleural effusion — because they are visually distinct and common enough to evaluate. Images are not included in the public repo.',
        transform:
          'No patient appears in both the training and test sets, and each finding is a yes/no label. Both are rare, so the loss is class-weighted instead of rewarding a model that always predicts “no finding.”',
        train:
          'ConvNeXt-Tiny (timm), pretrained on ImageNet, trained as one binary classifier per finding under AdamW. The retained checkpoint is the one with the best validation ROC-AUC; both findings shipped once their classifiers cleared that bar.',
        evaluate:
          'Evaluated on held-out NIH test images, reported separately for each finding. ROC-AUC measures ranking quality; a confusion matrix captures the operating point. The UI shows a calibrated confidence score and flags a finding only above a per-condition threshold. Precision at that threshold is the question a clinic would ask: when the system says review this, how often is it right?',
        serve:
          'A Spanish clinic app where a user opens a study and sees confidence for cardiomegaly and effusion, a Grad-CAM heatmap, and an exportable report, with role-based access and an audit trail. A licensed reader still interprets every image.',
      },
    },
    {
      id: 'cfpb-intelligence',
      name: 'Consumer complaint intelligence',
      tagline:
        'CFPB narratives routed to a financial product with TF-IDF and logistic regression, confidence, and a time-based holdout.',
      problem:
        'Complaints arrive as free text. Before a person reads the queue, the system should say which product the narrative is about — and how sure it is — without leaking later complaints into training.',
      result:
        'Evaluated on dates later than training: 0.80 accuracy, 0.80 weighted F1, 0.68 macro F1. Mortgage and credit reporting are strong; sparse classes such as money transfer are not. Predictions ship with confidence and ranked alternatives.',
      stack: ['Python', 'SQL', 'scikit-learn', 'MLflow', 'FastAPI', 'DuckDB'],
      metric: { label: 'holdout', value: '0.80 acc · 0.68 macro F1' },
      stages: {
        ingest:
          'Sourced from the CFPB Consumer Complaint Database. Many product labels exist; the model answers one question: given the narrative, which product is this. Company, issue, state, and date stay in the warehouse for SQL, outside the model itself.',
        transform:
          'Structured as a bronze → silver → gold star schema (complaint fact; company, product, issue, geography, channel, calendar). The train/test cut is by date: later complaints never train the model. Credit reporting dominates, so a majority classifier would look accurate and still be useless. Rare products below a minimum count are dropped.',
        train:
          'TF-IDF (unigrams and bigrams) feeding a class-weighted logistic regression, tracked in MLflow and trained as a single multi-class model for product. The retained run is the one scored on later dates rather than a shuffle of the same weeks.',
        evaluate:
          'Evaluated on held-out, later dates: accuracy 0.80, weighted F1 0.80, and macro F1 0.68 — the number that does not hide minority products. Precision and recall by product: mortgage and credit reporting hold up; money transfer does not. Each call returns a confidence and alternatives. The operational question is the same as screening: when it assigns a product, what fraction of those assignments are true positives?',
        serve:
          'Paste in a narrative and get the predicted product, a confidence score, and the next-likely alternatives, plus similar past complaints found through the same text representation. Analytic questions go to read-only SQL on the gold layer; an optional LLM-generated query still has to pass a SELECT-only guard. The model routes the complaint; a person closes the case.',
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