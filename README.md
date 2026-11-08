# GIS Day 2026

Static site for GIS Day 2026, live at **https://gisdaypgh.com**.

Built with Next.js (static export) and Tailwind. Site content lives in YAML files under `content/`.

## Editing content

| File                         | What it controls                       |
| ---------------------------- | -------------------------------------- |
| `content/home.yaml`          | Home page: event details, intro, menu  |
| `content/program.yaml`       | Program / agenda                       |
| `content/maps.yaml`          | Maps page                              |
| `content/tables.yaml`        | Tables page                            |
| `content/people.yaml`        | People referenced by other pages       |
| `content/organizations.yaml` | Organizations referenced by people     |
| `content/pages/*.yaml`       | Simple pages, served at `/<filename>/` |

Rich text fields are Markdown. Images and other static files go in `public/` and are referenced from the site root (e.g. `/images/agenda.gif`).

References between files (person ids, organization ids) are checked at build time, so a typo makes the build fail with a message naming the file and entry.

## Local development

Requires Node 26.

```sh
npm install
npm run dev       # dev server at http://localhost:3000
npm run build     # build the static site into out/
npm run preview   # serve out/ locally
npm run format    # format with Prettier
```

Run `npm run build` before pushing to catch content errors.

## Deploying

Pushing to `main` deploys the site. The GitHub Actions workflow in `.github/workflows/deploy.yml`:

1. installs dependencies with `npm ci`
2. runs `npm run build`, which writes the static site to `out/`
3. publishes `out/` to GitHub Pages

The site updates about a minute after the push. Track progress in the repo's **Actions** tab, or with `gh run watch`.

- **Redeploy without changes:** Actions → "Deploy to GitHub Pages" → **Run workflow**.
- **Failed builds:** nothing is deployed and the live site stays as it was. Check the failed run's log in the Actions tab.
- **Other branches:** pushes to other branches don't deploy.

## Hosting and DNS

GitHub Pages is set to use **GitHub Actions** as its source, under the repo's Settings → Pages. The custom domain `gisdaypgh.com` is set on the same screen. Tick **Enforce HTTPS** there once GitHub has issued the certificate. There is no `CNAME` file in the repo.

The site uses absolute paths like `/images/...`, so it must be served from a domain root. The `saylorsd.github.io/gis-day-2026/` address will show broken images and styling; use the custom domain.

DNS records for `gisdaypgh.com`:

| Type  | Name  | Value                                                                                      |
| ----- | ----- | ------------------------------------------------------------------------------------------ |
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `saylorsd.github.io` (optional; redirects `www` to the root domain)                        |

Check with `dig gisdaypgh.com +short`.
