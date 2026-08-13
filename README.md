# Portfolio – Altin Torba

Personal portfolio website showcasing my projects, skills, and background as a fullstack developer, built with Angular. Live at [altintorba.github.io/portfolio-altin](https://altintorba.github.io/portfolio-altin/).

## Features

- **Bilingual content (DE/EN)** — full German/English translation via `@ngx-translate/core`, with the selected language persisted in `localStorage`
- **Interactive contact form** — client-side validation, EmailJS integration for message delivery, and clear success/error feedback
- **Project showcase** — live demos and GitHub links for 8 projects (frontend and backend), each with a consistent laptop-mockup preview
- **Legal pages** — GDPR-compliant Privacy Policy and Legal Notice (Impressum)
- **Responsive design** — mobile, tablet, and desktop layouts, including widescreen (>1440px) adjustments
- **Automated deployment** — deployed to GitHub Pages via `angular-cli-ghpages`

## Tech Stack

- **Framework:** Angular (standalone components)
- **Language:** TypeScript
- **Styling:** SCSS
- **i18n:** @ngx-translate/core
- **Email:** EmailJS
- **Animations:** AOS (Animate On Scroll)
- **Linting:** ESLint (Angular ESLint rules)

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
```bash
npm install
```

### Development server
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

### Build
```bash
ng build
```
Build artifacts are output to `dist/`.

### Lint
```bash
ng lint
```

### Deploy to GitHub Pages
```bash
npx ng deploy portfolio-altin --base-href=/portfolio-altin/
```

## Project Structure
src/app/
├── atf/ # Hero / above-the-fold section
├── about-me/ # About me section
├── skills/ # Skills showcase
├── portfolio/ # Project cards and testimonials
├── contactform/ # Contact form with EmailJS
├── imprint/ # Legal notice page
├── privacy/ # Privacy policy page
├── shared/
│ ├── header/ # Navigation, language switcher
│ └── footer/ # Footer with social links, legal links
└── transition-image/ # Section transition graphics
## License

This project is for personal, non-commercial use as a digital application document.
