# BlogGo – Production-Ready Next.js Website

A modern blogging platform built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # / Home page
│   ├── features/page.tsx       # /features
│   ├── pricing/page.tsx        # /pricing
│   ├── support/page.tsx        # /support (Apple-compliant)
│   ├── privacy/page.tsx        # /privacy
│   ├── terms/page.tsx          # /terms
│   ├── profile/[username]/
│   │   ├── page.tsx            # /profile/[username] – demo profile
│   │   └── blog/[slug]/
│   │       └── page.tsx        # /profile/[username]/blog/[slug] – blog post
│   ├── editor/[slug]/
│   │   └── page.tsx            # /editor/[slug] – mock editor
│   ├── not-found.tsx           # 404 page
│   ├── loading.tsx             # Global loading skeleton
│   ├── error.tsx               # Error boundary
│   └── globals.css             # Global styles + design tokens
│
├── components/
│   ├── ui/                     # Design system components
│   │   ├── Button.tsx          # primary / secondary / ghost / destructive
│   │   ├── Card.tsx            # Soft shadow card with hover
│   │   ├── Badge.tsx           # Colored pill labels
│   │   ├── Input.tsx           # Accessible labeled input
│   │   ├── Accordion.tsx       # ARIA-compliant FAQ accordion
│   │   ├── Modal.tsx           # Focus-trapped dialog
│   │   ├── Container.tsx       # Max-width centered wrapper
│   │   └── SectionHeader.tsx   # Eyebrow + title + subtitle
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with mobile menu
│   │   └── Footer.tsx          # Footer with link groups
│   └── blog/
│       └── Lightbox.tsx        # Image lightbox with keyboard nav
│
└── lib/
    └── mock-data.ts            # 5 demo blog posts + author data
```

## ✏️ Where to Edit Content

| What | File | Variable/Section |
|---|---|---|
| Blog posts | `src/lib/mock-data.ts` | `mockBlogs` array |
| Author profile | `src/lib/mock-data.ts` | `demoAuthor` object |
| Support email | `src/app/support/page.tsx` | `SUPPORT_EMAIL` constant (line 12) |
| Pricing plans | `src/app/pricing/page.tsx` | `plans` array |
| Features list | `src/app/features/page.tsx` | `featureGroups` array |
| Nav links | `src/components/layout/Header.tsx` | `navLinks` array |
| Footer links | `src/components/layout/Footer.tsx` | `footerLinks` object |
| Privacy policy | `src/app/privacy/page.tsx` | Page content + `LAST_UPDATED` |
| Terms of service | `src/app/terms/page.tsx` | Page content + `LAST_UPDATED` |
| Site metadata | `src/app/layout.tsx` | `metadata` export |

## 🎨 Design System

CSS variables are defined in `src/app/globals.css`:

```css
--accent: #7c3aed        /* Primary violet */
--bg: #0a0a0f            /* Page background */
--bg-card: #13131a       /* Card background */
--text-primary: #f0f0f8  /* Headings */
--text-secondary: #9090b0 /* Body text */
```

## 🔗 Demo Routes

| URL | Description |
|---|---|
| `/` | Home page |
| `/features` | Features grid |
| `/pricing` | Pricing plans |
| `/support` | Contact form + FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/profile/demo` | Demo author profile |
| `/profile/demo/blog/getting-started-with-nextjs-14` | Sample blog post |
| `/editor/my-first-post` | Mock editor (saves to localStorage) |

## 📝 Notes

- **No paid APIs or environment variables required** — everything runs offline
- **Editor** saves drafts to `localStorage` keyed by slug
- **Images** use `picsum.photos` (free, no API key needed)
- **Support email** is a placeholder — update `SUPPORT_EMAIL` in `support/page.tsx`
