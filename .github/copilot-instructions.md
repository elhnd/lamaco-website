# Project Context — LAMACO

LAMACO is a Senegal-based company operating in the construction and building materials sector.

The company provides:

- Construction materials supply (sand, basalt, concrete materials)
- Heavy equipment rental (excavators, dump trucks)
- Construction logistics and site supply

LAMACO mainly serves:
- Construction companies
- Real estate developers
- Contractors
- Individual builders

The goal of the website is to present LAMACO as a **professional, reliable and modern construction partner**.

The website must:

- Showcase LAMACO services and materials
- Present construction projects and field expertise
- Generate quote requests from potential clients
- Encourage direct contact via phone and WhatsApp
- Build trust with contractors and developers

Key characteristics of the brand:

- Professional
- Reliable
- Solid
- Modern
- Industrial and construction oriented

Target audience:

- Construction companies
- Real estate developers
- Contractors
- Individuals building houses

Primary goals of the website:

1. Present LAMACO services clearly
2. Showcase expertise and projects
3. Generate quote requests
4. Encourage WhatsApp contact
5. Reinforce credibility and trust

The design should reflect a **premium construction company website** with large imagery, strong typography, and clear sections.

# LAMACO — Development Guidelines (Symfony + UX + SQLite)

---

# 1. Stack (Mandatory)

- Symfony (latest LTS)
- Twig + Symfony UX (Stimulus, Turbo, LiveComponent if needed)
- Doctrine ORM
- SQLite
- AssetMapper or Webpack Encore (choose ONE)
- No unnecessary dependencies

Single web app using Symfony only.

---

# 2. Brand Guidelines (MANDATORY)

## 2.1 Primary Colors (Official)

- Primary Blue: #1F4E79
- Gold Accent: #F5A623
- Light Background: #FAFAFA
- Dark Neutral: #3C3C3C

Color meanings:
- Blue = reliability, stability, professionalism
- Gold = energy, innovation, dynamism

Use strong contrast between blue and gold.
Never introduce random new brand colors.

---

## 2.2 Typography (Official)

- Headings: Montserrat
- Body text: DM Sans

Rules:
- Use Montserrat for all titles (H1–H4)
- Use DM Sans for paragraphs and UI text
- Keep typography clean and modern
- Avoid decorative fonts

---

## 2.3 Logo Rules

- Icon: geometric gold symbol (#F5A623)
- Text: "LAMACO" in blue (#1F4E79)
- Maintain spacing and proportions
- Do not distort, recolor, or add effects
- Prefer clean white or blue backgrounds

---

## 2.4 Visual Style

- High-quality construction imagery
- Mobile-first

Sticky WhatsApp CTA allowed (using brand colors only).

---

# 3. Core Engineering Principles

- Clean, readable code
- Strict typing everywhere
- Thin controllers
- Rich services
- No business logic in Twig
- Progressive enhancement

---

# 4. Architecture Rules

## Controllers
- Orchestration only
- No business logic

## Services
- Business logic in services
- Constructor injection only

---

# 5. Symfony UX Rules

- Stimulus for interactions
- Turbo optional
- LiveComponent only for:
  - Multi-step quote form
  - Interactive filters/calculators

No inline JS in Twig.

---

# 6. Database (SQLite + Doctrine)

- Migrations only
- Proper constraints and indexes
- Entities must remain clean
- Use DTOs for forms if needed

---

# 7. Coding Standards

- declare(strict_types=1);
- Fully typed properties and return types
- PSR-12
- No dead code

---

# 8. Security

- CSRF on all forms
- Server-side validation
- Twig autoescape enabled
- Safe file uploads
- Basic security headers

---

# 9. SEO & Performance

- Semantic HTML
- Proper title/meta per page
- Optimized images
- Lazy loading
- Mobile-first layout
- Sitemap + robots.txt

---

# 12. Definition of Done

A feature is done when:

- Strictly typed
- No business logic in controllers
- Mobile responsive
- Respects brand guidelines (colors + fonts)

---

Keep the code modular, scalable, and aligned with LAMACO brand identity.