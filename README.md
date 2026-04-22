# Spiceroad Platform

Spiceroad Platform is an Astro-based frontend for a Silkroad Online private-server storefront. The authored application lives in `src/`, and the deployable static output is generated into `site/` only during local builds or the GitHub Pages workflow.

This repository intentionally keeps a root `CNAME` file as a conservative GitHub Pages custom-domain safeguard, while also generating `site/CNAME` from source during the build.

## Project Description

This project provides the marketing site, product catalog, gated resource pages, and dashboard shell for `platform.spiceroad.online`.

It is structured so that:

- all authored frontend code lives in `src/`
- build output is generated into `site/`
- GitHub Pages publishes from the workflow artifact, not from committed static files
- the custom domain is represented both by the root `CNAME` file and by `src/pages/CNAME.ts`

## Tech Stack

- Astro
- TypeScript
- Lit for reusable web components
- GitHub Actions for build and deployment

## Features

- multi-page Astro site with shared layouts and components
- structured product, guide, and resource content in source
- legacy `.html` compatibility routes generated from source
- GitHub Pages deployment to a generated `site/` directory
- filesystem-safe output normalization for local static previewing

## Setup

### Prerequisites

- Node.js 20 or newer
- npm

### Install Dependencies

```bash
npm ci
```

If you intentionally change dependencies, run `npm install` and commit the updated lockfile.

## Development

Start the local development server:

```bash
npm run dev
```

## Building

Create the production build:

```bash
npm run build
```

This command:

- builds the Astro site
- writes generated output to `site/`
- normalizes generated asset and link paths for local static viewing

The `site/` directory is generated output and is not intended to be committed.

## Preview

Preview the built site locally:

```bash
npm run preview
```

## Deployment

GitHub Pages deployment is handled by [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).

On pushes to `main`, the workflow:

- installs dependencies with `npm ci`
- runs `npm run build`
- uploads the generated `site/` directory as the Pages artifact
- deploys the artifact to GitHub Pages

## Project Structure

```text
.
|- .github/workflows/      # GitHub Pages deployment workflow
|- scripts/                # Build-time helper scripts
|- src/
|  |- assets/              # Images and source-owned media
|  |- components/          # Astro and Lit UI components
|  |- content/             # Structured product and page content
|  |- layouts/             # Shared page layouts
|  |- lib/                 # Routes, config, SEO, and helpers
|  |- pages/               # Astro routes and generated compatibility endpoints
|  |- scripts/             # Client-side browser scripts bundled by Astro
|  |- styles/              # Global styles, tokens, and utilities
|  '- env.d.ts             # Astro type declarations
|- astro.config.mjs        # Astro configuration
|- package.json            # Scripts and dependencies
|- tsconfig.json           # TypeScript configuration
'- README.md               # Project documentation
```

## Contributing

1. Create a feature branch for your changes.
2. Keep authored changes inside `src/`, `scripts/`, config files, or docs.
3. Do not commit generated `site/` output.
4. Run `npm run build` before opening a pull request.
5. Update documentation when behavior, structure, or workflows change.

## Notes

- There is no authored `public/` directory in this project.
- Static compatibility files such as `products.html` are generated from source endpoints under `src/pages/`.
- The root `CNAME` file is intentionally kept in the repository as a persistent GitHub Pages custom-domain marker.
- `src/pages/CNAME.ts` also generates the published `site/CNAME` file so the deployment artifact contains the same domain value.
- Generated deployment output still belongs in build artifacts, not in committed `site/` content.
