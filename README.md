# Executive Pricing Engine — Frontend

This folder contains the frontend for the Executive Pricing Engine — a React + Vite TypeScript app using Tailwind CSS and shadcn-ui.

Quick start
-----------

Prerequisites:
- Node.js 16+ (use nvm if needed)
- npm or pnpm

Install and run locally:

```bash
cd frontend/executive-pricing-engine
npm install
npm run dev
```

Build and preview (production build):

```bash
npm run build
npm run preview
```

Where images live
-----------------
Place exported EDA images into `public/` (or `public/graphs/` if you prefer). The `Graphs` page serves images from the public folder; prefer hyphenated, lowercase filenames (e.g. `eda-churn-by-segment.png`) to avoid URL issues.

If you deploy under a subpath (GitHub Pages / repo-name), ensure `base` in `vite.config.ts` is set correctly so `import.meta.env.BASE_URL` resolves assets.

Deployment
----------
You can deploy the frontend to Netlify, Vercel, or GitHub Pages.

- Netlify / Vercel: connect the repository, set the build command to `npm run build`, and the publish directory to `dist`.

- GitHub Pages (recommended steps):
	1. Set `base` in `vite.config.ts`, e.g. `base: '/repo-name/'`.
	2. Build the app: `npm run build`.
	3. Deploy `dist/` to GitHub Pages (via `gh-pages` or GitHub Actions).

Example GitHub Actions workflow (place in `.github/workflows/ci.yml`):

```yaml
name: CI – Build Frontend

on: [push]

jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Use Node.js
				uses: actions/setup-node@v4
				with:
					node-version: 18
			- run: cd frontend/executive-pricing-engine && npm ci
			- run: cd frontend/executive-pricing-engine && npm run build
			- name: Upload artifact
				uses: actions/upload-artifact@v4
				with:
					name: frontend-dist
					path: frontend/executive-pricing-engine/dist
```

Contribution guide
------------------
- Branching: create feature branches from `main` named `feat/<short-desc>` or `fix/<short-desc>`.
- Commit messages: use conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Pull requests: open PRs against `main`; include a short description and test steps.
- Code style: run `npm run lint` (if configured) and keep TypeScript types clean; prefer small focused PRs.

Local testing & linting
----------------------
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally

Notes
-----
- Filenames with spaces are URL-encoded but using hyphenated filenames is more robust for static hosts.
- If images 404 after deployment, verify the deployed asset path (base URL) and that files were included in the `dist/` output.

Need anything else?
-------------------
I can:
- Add the GitHub Actions workflow file for you and commit it.
- Normalize public image filenames and add a `public/graphs/placeholder.png` fallback.
- Add linting / test scripts to `package.json`.

Tell me which and I'll implement it.
