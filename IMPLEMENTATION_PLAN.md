# Platform Frontend Implementation Plan

## Goal

Turn the current HTML-only mockup into a real frontend product under `./src/`, while keeping `./site/` as the generated static output published by GitHub Pages.

This plan assumes the following direction:
- frontend framework: **Astro**
- shared interactive component approach: **Lit**
- static deployment target: **GitHub Pages** via GitHub Actions
- repository strategy:
  - `src/` = authored source code
  - `site/` = generated build output
  - `.github/workflows/deploy-pages.yml` = publishes `site/`

---

## Current State

The repository is still at an early stage.

Known current state:
- root currently contains the project README
- GitHub Pages has been switched toward an Actions-based deployment flow
- the visual site currently exists as an HTML/CSS mockup rather than a structured frontend application
- the business/domain intent is already clear: a premium partner platform for server owners, including installer, launcher, subscriptions, customization services, and related partner workflows

This means the correct next step is **not** to keep extending raw HTML files directly.
The correct next step is to establish a proper source architecture under `src/` and make `site/` build output only.

---

## Target Architecture

```text
README.md
IMPLEMENTATION_PLAN.md
site/                    # generated static output for GitHub Pages
src/
  content/
    products/
    guides/
    news/
  layouts/
    BaseLayout.astro
    MarketingLayout.astro
    PlatformLayout.astro
  pages/
    index.astro
    products/
      index.astro
      launcher.astro
      installer.astro
    free-resources.astro
    guides/
      index.astro
    dashboard.astro
  components/
    astro/
      Header.astro
      Footer.astro
      Hero.astro
      SectionTitle.astro
      ProductCard.astro
      ProductGrid.astro
      FeatureStrip.astro
      CtaBand.astro
      Seo.astro
    lit/
      sr-button.ts
      sr-card.ts
      sr-tabs.ts
      sr-upload-box.ts
  styles/
    global.css
    tokens.css
    utilities.css
  lib/
    config.ts
    routes.ts
    seo.ts
    content.ts
  assets/
    images/
    icons/
public/
package.json
astro.config.mjs
tsconfig.json
```

---

## Core Architectural Rules

### 1. `site/` becomes build output only
Once Astro is introduced, `site/` must no longer be hand-authored.
It should only contain generated files.

### 2. `src/` becomes the real product
All real work should happen under `src/`.
That includes pages, layouts, reusable sections, content definitions, and interactive components.

### 3. Astro first, Lit second
Use Astro for:
- pages
- layouts
- SEO
- content rendering
- static sections

Use Lit for:
- reusable interactive widgets
- design-language primitives that benefit from being true web components
- components shared across multiple pages and later across multiple sites

### 4. Design tokens are a first-class concern
The current visual direction depends heavily on a branded dark/gold design system.
That system should be centralized through CSS variables and token files, not scattered hardcoded values.

### 5. Product data should not live deep inside page markup
Installer, launcher, subscriptions, and related services should move toward structured content/data definitions.

---

## Recommended Stack

### Frontend
- **Astro** for static-first, SEO-friendly pages
- **TypeScript** for project code
- **Lit** for reusable interactive web components
- optional: **Tailwind** for layout utilities only

### Deployment
- GitHub Actions builds Astro output into `site/`
- GitHub Pages serves `site/`

### Future backend compatibility
The frontend should be structured so it can later talk to a backend/API without major rewrites.
That means:
- central config for API base URLs
- isolated upload/download UI
- no backend-specific assumptions baked into page markup

---

## Implementation Phases

# Phase 1 — Tooling Foundation

## Goal
Bootstrap the real frontend application in the repository.

## Tasks
- initialize Astro in repo root
- add TypeScript support
- configure Astro output to `./site`
- add a base `package.json`
- add `astro.config.mjs`
- add a minimal `tsconfig.json`
- confirm the GitHub Actions workflow can deploy the generated `site/`

## Deliverable
A minimal Astro app builds successfully and outputs static files to `site/`.

---

# Phase 2 — Move the Mockup into Source Structure

## Goal
Stop treating the HTML mockup as the product and start treating it as source material.

## Tasks
- preserve the current HTML/CSS mockup as a visual reference
- rebuild the homepage inside Astro
- split the monolithic HTML into reusable parts

## First components to extract
- `Header.astro`
- `Footer.astro`
- `Hero.astro`
- `SectionTitle.astro`
- `ProductCard.astro`
- `FeatureStrip.astro`
- `CtaBand.astro`

## Deliverable
Homepage visuals are preserved, but the code is now structured and reusable.

---

# Phase 3 — Establish Layouts and Global Styling

## Goal
Create a maintainable visual system.

## Tasks
- create `BaseLayout.astro`
- create a platform-specific layout if needed
- move resets and base rules into `global.css`
- move all brand variables into `tokens.css`
- create utility helpers in `utilities.css` if needed

## Token categories to define
- background colors
- panel/surface colors
- accent golds
- text colors
- border colors
- shadow/glow presets
- radius scale
- spacing scale
- typography scale

## Deliverable
A stable visual foundation that supports both current pages and future shared components.

---

# Phase 4 — Build Real Route Structure

## Goal
Turn the platform into a real multi-page product.

## Required initial routes
- `/`
- `/products`
- `/products/launcher`
- `/products/installer`
- `/free-resources`
- `/guides`
- `/dashboard`

## Tasks
- create route files under `src/pages`
- wire the navigation using real links
- create a consistent page-header pattern
- ensure all pages use shared layouts/components

## Deliverable
A navigable static frontend product rather than a landing-page-only mockup.

---

# Phase 5 — Introduce Structured Content

## Goal
Avoid hardcoding all business content inside individual pages.

## Candidate content domains
- product catalog entries
- product FAQs
- guides
- news/updates
- free resources

## Tasks
- define structured product objects or content files
- render product listing pages from shared data
- render product detail pages from shared data/content
- centralize CTA labels and pricing metadata where possible

## Initial product content to model
- installer
- installer subscription
- launcher
- launcher subscription
- customization services
- graphic design services

## Deliverable
The platform becomes easier to maintain and expand without duplicating copy and metadata everywhere.

---

# Phase 6 — Start the Shared UI Layer with Lit

## Goal
Introduce real reusable web components gradually, not all at once.

## Start with a small v1 set
- `sr-button`
- `sr-card`
- `sr-tabs`
- `sr-upload-box`

## Rules for Lit usage
- only build Lit where interactivity or shared behavior really matters
- static layout sections should remain Astro components
- Lit components should consume the shared CSS variable design tokens

## Deliverable
A clean starting point for the shared design language without over-engineering the whole app.

---

# Phase 7 — SEO and Metadata Pass

## Goal
Make the platform search-friendly from the start.

## Tasks
- add reusable SEO component/helper
- define title/description/open graph defaults
- add per-page metadata overrides
- add canonical URLs where appropriate
- plan for Product / FAQ / Breadcrumb structured data later

## Deliverable
The site stops being “just static pages” and starts becoming a real discoverable frontend product.

---

# Phase 8 — Backend Readiness

## Goal
Prepare the frontend for future backend integration without coupling it too early.

## Tasks
- create `src/lib/config.ts` for environment-driven URLs
- create a small API client layer stub in `src/lib`
- isolate upload UI from backend implementation details
- define placeholder auth-aware page behavior for dashboard/account/order flows

## Deliverable
The frontend stays static-hostable today, but is ready to evolve into a real application later.

---

## Immediate First Sprint

This is the recommended first concrete implementation sprint.

### Sprint goal
Get from HTML mockup to real Astro foundation with one real page and reusable structure.

### Sprint tasks
1. Initialize Astro in repo root
2. Configure output to `site/`
3. Create:
   - `src/layouts/BaseLayout.astro`
   - `src/components/astro/Header.astro`
   - `src/components/astro/Footer.astro`
   - `src/components/astro/ProductCard.astro`
   - `src/pages/index.astro`
4. Add:
   - `src/styles/global.css`
   - `src/styles/tokens.css`
5. Rebuild the homepage from the mockup using the new structure
6. Verify the GitHub Actions deployment serves the generated site correctly

### Sprint deliverable
A real frontend foundation is in place, and the homepage is no longer raw static HTML.

---

## Suggested Milestones

### Milestone 1 — Foundation
Astro app builds into `site/` and deploys successfully.

### Milestone 2 — Homepage Refactor
Homepage matches the approved design direction using structured Astro components.

### Milestone 3 — Product Pages
Launcher and installer detail pages are rebuilt as real routes.

### Milestone 4 — Content Layer
Products/guides/free resources move into structured content.

### Milestone 5 — Shared UI v1
First Lit-based shared components are introduced.

### Milestone 6 — Backend-Ready Frontend
Frontend is ready for future API integration, uploads, auth, and dashboard flows.

---

## Anti-Goals

Things to avoid during implementation:

- do not keep manually editing `site/` once Astro is in place
- do not convert every section into Lit immediately
- do not hardcode all product metadata into multiple pages
- do not let the design tokens live as repeated magic values across files
- do not overbuild backend integration before the frontend shell is stable

---

## Final Recommended Direction

Build the platform as:
- **Astro-first** for structure, pages, content, and SEO
- **Lit-enhanced** for reusable interactive components and long-term design language evolution
- **GitHub Actions + `site/` output** for deployment

This gives the project a clean path from HTML mockup to maintainable frontend product, while preserving your future options for shared components, backend integration, and multi-site reuse.
