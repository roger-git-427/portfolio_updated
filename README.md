# Rogelio Lizarraga — portfolio

Queryable personal site: SQL workbench on the homepage, about section, and projects as DAGs (ingest → transform → train → evaluate → serve). English / Spanish.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Edit content

Copy lives in:

- `src/i18n/en.ts` — English
- `src/i18n/es.ts` — Spanish

Update name, links, skills, and project writeups there. Optional: drop a PDF in `public/resume.pdf` and set `resumeUrl: '/resume.pdf'`.

## Deploy on Vercel (Hobby / free)

1. Create a GitHub repo and push this project (`main` branch).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework should be **Vite**. Build: `npm run build`. Output: `dist`.
4. Deploy. You get a `*.vercel.app` URL for your resume.

Later pushes to `main` redeploy automatically. Your computer is not involved after that.

## Query cheatsheet

| statement | what happens |
| --- | --- |
| `SELECT * FROM engineer;` | about |
| `SELECT * FROM projects;` | work |
| `SHOW TABLES` | catalog |
| `DESCRIBE engineer` | columns |
| `HELP` | in-app help |
