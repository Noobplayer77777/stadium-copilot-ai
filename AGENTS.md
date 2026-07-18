# AGENTS.md — Stadium Copilot AI Development Guide

> **This file is the permanent development contract for all agents and engineers working on this repository.**
> Read it in full before making any changes.

---

## Project Overview

**Stadium Copilot AI** is an AI-powered operational intelligence platform designed to improve stadium operations and the FIFA World Cup 2026 tournament experience.

It serves four distinct user roles:

| Role | Description |
|---|---|
| **Fan** | Match attendees navigating the stadium |
| **Volunteer** | On-ground staff handling tasks and crowd assistance |
| **Organizer** | Command-center operators with full situational awareness |
| **Venue Staff** | Maintenance, security, and zone-level operations |

This project is being built for the **FIFA World Cup 2026 GenAI Hackathon**.

The **Product Specification** (`stadium_copilot_spec.md`) and the **Technical Architecture** (`stadium_copilot_architecture.md`) are the **single source of truth** for all design and engineering decisions. Read them before implementing anything.

---

## Architecture Rules

Always follow the approved architecture. **Never replace technologies** unless explicitly instructed by the user.

### Frontend Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui + Radix UI primitives |
| State Management | Zustand v5 |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Charts | Recharts |

### Backend Stack (Phase 4+)
| Layer | Technology |
|---|---|
| API | FastAPI (Python) |
| AI Orchestration | LangChain / Google ADK |
| Realtime DB | Firebase Firestore |
| Vector DB | As specified in architecture doc |
| Auth | Firebase Auth |

---

## Coding Standards

- Apply **SOLID principles** throughout.
- Keep components **small and focused** — one responsibility per component.
- **Reuse components** from `@/components/ui` before creating new ones.
- **Never duplicate logic** — extract shared logic into `@/lib` or `@/hooks`.
- Never create multiple versions of the same component.
- Prefer **composition over inheritance**.
- Use **TypeScript strictly** — `strict: true` is enforced in `tsconfig.json`.
- **Avoid `any` type** — use `unknown` and proper type guards if needed.
- Follow naming conventions:
  - Components: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts`
  - Utilities: `camelCase.ts`
  - Constants: `SCREAMING_SNAKE_CASE`
  - Types/Interfaces: `PascalCase`

---

## UI Rules

- Always follow the **existing design system** in `src/app/globals.css`.
- Use **CSS custom properties** (design tokens) — never hardcode hex colors.
- Use `rgb(var(--token-name))` syntax for all color references.
- Use **responsive layouts** — mobile-first, breakpoints: `sm`, `md`, `lg`, `xl`.
- Follow **WCAG 2.1 AA accessibility** standards:
  - All interactive elements must have `aria-label` or visible text.
  - Use semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<aside>`).
  - Maintain color contrast ratios.
  - Support keyboard navigation.
- Support **dark and light themes** via `next-themes` — test both modes.
- Never override theme tokens inline with hardcoded values.

---

## Development Rules

Before modifying any file:
1. **Read the file** and understand its current implementation.
2. **Identify all imports and dependents** before changing exports.
3. **Never overwrite working code** with a complete rewrite — make surgical edits.
4. **Modify the minimum number of files** required to fulfill the task.
5. Keep changes **modular** — one logical change per commit.
6. Run `npx tsc --noEmit` to verify TypeScript after changes.
7. Run `npm run build` before declaring a task complete.

### File Organization
```
src/
  app/          → Next.js App Router pages and layouts
  components/
    ui/         → Base UI primitives (Button, Card, Input, etc.)
    layout/     → Shell components (Sidebar, TopNavBar, RoleLayout, etc.)
    shared/     → Cross-role reusable components (SearchBar, ThemeToggle, etc.)
    charts/     → Recharts wrappers
    forms/      → Form-specific components
  hooks/        → Custom React hooks
  lib/          → Pure utility functions and constants
  providers/    → React context providers
  store/        → Zustand state stores
  styles/       → Additional global styles (if needed)
  types/        → Shared TypeScript types
```

---

## AI Rules

- **Do not hallucinate APIs** — only use APIs confirmed to exist in the architecture.
- **Do not invent database schemas** — follow the approved Firestore schema.
- **Do not create endpoints** unless explicitly requested by the user.
- **Do not build backend** during frontend phases.
- **Do not create mock data** that resembles real operational data.
- Reference the architecture document for AI agent definitions and prompt structures.

---

## Phase Rules

### Current Phase: Phase 3 — Frontend Foundation

**Only work on frontend infrastructure.** The goal is to build a production-ready shell that feature teams can extend.

| Allowed | Not Allowed |
|---|---|
| UI components and primitives | Business feature modules |
| Role-based layouts and routing | AI chat interfaces |
| State management stores | Map/navigation features |
| Theme system | Firebase connections |
| Global providers | API calls |
| Placeholder pages | Real authentication flows |
| Design tokens | Backend code |

### Phase Progression
| Phase | Scope |
|---|---|
| Phase 1 | Product Specification ✅ |
| Phase 2 | Technical Architecture ✅ |
| Phase 3 | Frontend Foundation ← **Current** |
| Phase 4 | AI Engine & Backend |
| Phase 5 | Feature Modules |
| Phase 6 | Polish & Deployment |

---

## Folder Rules

- `components/ui/` — Only base, role-agnostic UI primitives.
- `components/layout/` — Only shell/structural components.
- `components/shared/` — Reusable components used across multiple roles.
- `components/charts/` — Chart wrappers only — no data fetching inside.
- `components/forms/` — Form-specific wrappers using React Hook Form.
- `app/[role]/` — Role-specific pages and layouts only.
- `store/` — One file per Zustand store.
- `hooks/` — One file per hook (or group of related hooks).
- `lib/` — Pure functions only — no React, no side effects.
- `types/` — Shared type definitions only.

Do not place unrelated code together. If unsure where a file belongs, refer to this guide.

---

## Quality Checklist

**Before completing any task, verify all of the following:**

- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run lint` passes with zero errors or warnings
- [ ] `npm run build` succeeds
- [ ] No duplicate components exist
- [ ] No broken imports (check barrel exports)
- [ ] All pages are responsive (mobile + tablet + desktop)
- [ ] Dark mode and light mode both render correctly
- [ ] All interactive elements are keyboard accessible
- [ ] No hardcoded colors — all use design tokens
- [ ] No `any` types in TypeScript
- [ ] File is in the correct folder per Folder Rules
- [ ] Component is not recreating logic that already exists in `@/lib` or `@/hooks`

---

## AI Context Rules

- Always inspect existing implementation before generating new code.
- Extend existing components instead of replacing them.
- Never create duplicate components.
- Prefer editing existing files over creating new ones.
- If implementation details are unclear, leave TODO comments instead of inventing architecture.
- Preserve project structure and naming conventions.

---

## Git Workflow Rules

- One task = one logical commit.
- Never modify unrelated features together.
- Never rename folders unless explicitly instructed.
- Keep pull requests and commits focused.
- Maintain a clean Git history.

---

## Performance Rules

- Prefer React Server Components where appropriate.
- Minimize Client Components.
- Use dynamic imports for heavy components.
- Avoid unnecessary re-renders.
- Memoize expensive calculations.
- Keep bundle size small.
- Optimize image loading.
- Follow Next.js best practices.

---

## Documentation Rules

- Document exported components.
- Document reusable hooks.
- Keep README updated if project structure changes.
- Keep architecture documentation synchronized.
- Add comments only where necessary to explain complex logic.

---

*Last updated: Phase 3.2 — Reusable UI*
