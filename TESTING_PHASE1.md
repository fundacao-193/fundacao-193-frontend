# Phase 1 Testing & Verification Checklist

## Overview
This document validates all Phase 1 improvements for presentation-readiness. Testing should cover navigation, error handling, accessibility, and responsive design.

**Server Status**: ✅ Running on http://localhost:5173 (Vite dev server)

---

## 1. Navigation Testing ✅

### 1.1 Hash-Based Routing (No React Router)
- [ ] Click "Início" → page scrolls to #inicio (Hero section)
- [ ] Click "Quem Somos" → changes hash to #quem-somos (About section)
- [ ] Click "Institucional" dropdown → shows 4 menu items
  - [ ] "Quem Somos" → navigates correctly
  - [ ] "Nossa História" → navigates to OurStory page
  - [ ] "Missão e Valores" → navigates to MissionValues page
  - [ ] "Equipe" → navigates to Team page
- [ ] Click "Atuação" dropdown → shows 4 menu items
  - [ ] "Projetos" → navigates to Projects page
  - [ ] "Capacitação" → navigates to Training page
  - [ ] "Eventos" → navigates to Events page
  - [ ] "Parcerias" → navigates to OurPartnerships page
- [ ] Click "Transparência" dropdown → shows 4 menu items
  - [ ] "Prestação de Contas" → navigates to Accounts page
  - [ ] "Editais" → navigates to Edits page
  - [ ] "Documentos" → navigates to Documents page
  - [ ] "LGPD" → navigates to LGPD page
- [ ] Click "Impacto" → scrolls to #impacto (Impact section)
- [ ] Click "Notícias" → scrolls to #noticias (News section)
- [ ] Click "Contato" → scrolls to #contato (Contact section)
- [ ] Click "Colabore" button → navigates to #colabore (Collaborate page)
- [ ] Verify URL hash changes in browser address bar

### 1.2 Back Navigation
- [ ] Navigate to any page (e.g., Projects)
- [ ] Click "Voltar" button → returns to homepage (#inicio)
- [ ] Training page uses `window.history.back()` → verifies back button works
- [ ] All page components have back button with `aria-label`

### 1.3 Document Title Updates
- [ ] Homepage shows: "Fundação 193 - Instituição de Apoio ao CBMDF"
- [ ] Nossa História page shows: "Nossa História - Fundação 193"
- [ ] Missão e Valores page shows: "Missão e Valores - Fundação 193"
- [ ] Colabore page shows: "Colabore - Fundação 193"
- [ ] (Verify in browser tab title)

---

## 2. Error Handling & Retry Functionality ✅

### 2.1 Professional Error UI (All Data Components)
Components improved: News, Projects, Partners, Events, Training

For **each component**:
- [ ] **Loading State**: Shows spinner with "Carregando..." message (animated dot + text)
- [ ] **Error State** (simulate by breaking API URL temporarily):
  - [ ] Shows red error card (bg-red-50, border-red-200)
  - [ ] Has AlertCircle icon (red-600 color)
  - [ ] Error message: "Não conseguimos carregar [X] no momento. Tente novamente mais tarde."
  - [ ] Has "Tentar Novamente" button with RotateCw icon
- [ ] **Retry Button**: 
  - [ ] Clicking retry re-fetches data
  - [ ] Button has proper focus state (outline-red when focused)
  - [ ] Button has `aria-label` for accessibility

### 2.2 Global Error Boundary
- [ ] App.tsx wrapped in `<ErrorBoundary>` component
- [ ] If rendering error occurs, shows graceful error card
- [ ] Error card displays user-friendly message in production
- [ ] Development mode shows error details in `<details>` element
- [ ] "Voltar ao Início" button navigates home

---

## 3. Accessibility Improvements ✅

### 3.1 Focus States
- [ ] Tab through all navigation links → visible focus outline (blue-ish outline)
- [ ] Tab to buttons (back buttons, retry buttons) → focus state visible
- [ ] Focus outline color: primary color (#3d685d)
- [ ] Focus outline offset: 2px spacing from element
- [ ] All interactive elements: `focus:outline-2 focus:outline-offset-2 focus:outline-[#3d685d]`

### 3.2 ARIA Labels & Semantic HTML
**Header Navigation:**
- [ ] `<nav role="navigation" aria-label="Navegação principal">` on desktop
- [ ] `<nav role="navigation" aria-label="Menu móvel">` on mobile
- [ ] Dropdown buttons have `aria-expanded` (true/false based on state)
- [ ] Dropdown buttons have `aria-haspopup="true"`
- [ ] Mobile menu button has `aria-label="Abrir menu"` / `"Fechar menu"`
- [ ] Mobile menu button has `aria-expanded` and `aria-controls="mobile-menu"`

**Back Buttons (All Pages):**
- [ ] `aria-label="Voltar para página inicial"` on back buttons
- [ ] All page components have proper aria-labels

**Retry Buttons (Data Components):**
- [ ] News: `aria-label="Recarregar notícias"`
- [ ] Projects: `aria-label="Recarregar projetos"`
- [ ] Partners: `aria-label="Recarregar parceiros"`
- [ ] Events: `aria-label="Recarregar eventos"`
- [ ] Training: `aria-label="Recarregar capacitações"`

**Icons:**
- [ ] AlertCircle icon has `aria-hidden="true"` (non-essential decoration)
- [ ] Semantic icons are properly labeled

### 3.3 Keyboard Navigation
- [ ] Tab key moves through all interactive elements in logical order
- [ ] Shift+Tab moves backward through elements
- [ ] All dropdowns openable/closeable with keyboard
- [ ] Enter key activates buttons
- [ ] Escape key can close dropdowns (if implemented)

---

## 4. Responsive Design Testing ✅

### 4.1 Mobile Viewport (375px width)
- [ ] Mobile menu hamburger button appears (hidden on lg breakpoint)
- [ ] Navigation menu collapses into mobile menu
- [ ] Dropdown menus work on mobile (toggle on click, not hover)
- [ ] Logo and header text remain readable
- [ ] All buttons have sufficient touch target size (≥44px height)
- [ ] Page content is readable without horizontal scrolling
- [ ] Images scale properly
- [ ] Spacing and padding adjusted for mobile

### 4.2 Tablet Viewport (768px width)
- [ ] Navigation adjusts properly
- [ ] Grid layouts adjust (e.g., 3 columns → 2 columns)
- [ ] Readability maintained

### 4.3 Desktop Viewport (1440px+ width)
- [ ] Full navigation menu visible (no mobile hamburger)
- [ ] Dropdown menus appear on hover
- [ ] Multi-column grids render fully
- [ ] Hero section displays prominently

---

## 5. API Integration Testing ✅

### 5.1 Environment Variables
- [ ] `.env.example` file exists with `VITE_WP_API_URL` variable
- [ ] `.env.local` file exists (not committed) with actual WordPress URL
- [ ] `VITE_WP_API_URL` correctly points to WordPress REST API

### 5.2 WordPress API Calls (Browser DevTools)
Open DevTools → Network tab, then:
- [ ] Navigate to News section → see `/wp-json/wp/v2/noticia` call ✅
- [ ] Navigate to Projects page → see `/wp-json/wp/v2/projeto` call ✅
- [ ] Navigate to Partners section → see `/wp-json/wp/v2/parceria` call ✅
- [ ] Navigate to Events page → see `/wp-json/wp/v2/evento` call ✅
- [ ] Navigate to Training page → see `/wp-json/wp/v2/capacitacao` call ✅

### 5.3 API Response Validation
- [ ] All API calls return 200 status
- [ ] Data loads and renders without errors
- [ ] Content displays correctly (titles, descriptions, dates)
- [ ] Verify response data contains expected fields

### 5.4 Offline Error Handling
- [ ] Temporarily change API URL in DevTools → observe error message
- [ ] Retry button reloads data when connection restored
- [ ] No blank screens or white-screen-of-death

---

## 6. Browser DevTools Validation ✅

### 6.1 Console Errors
- [ ] Open DevTools Console (F12)
- [ ] No JavaScript errors in console
- [ ] No warnings about missing dependencies
- [ ] No TypeScript errors reported

### 6.2 Network Performance
- [ ] Main bundle loads quickly (<2s)
- [ ] Lucide-react icons load properly
- [ ] API calls complete without 404s
- [ ] Images from Pexels/external sources load correctly

### 6.3 React DevTools (if installed)
- [ ] No warnings about missing keys in lists
- [ ] Component hierarchy renders correctly
- [ ] State updates reflect properly in UI

---

## 7. Design System Validation ✅

### 7.1 Colors (Design Tokens)
- [ ] Primary color (#3d685d) used consistently
  - [ ] Header navigation
  - [ ] Buttons
  - [ ] Focus outlines
  - [ ] Active states
- [ ] Neutral colors (100-900 scale) used for text/backgrounds
- [ ] Error color (red) used for error states
- [ ] Tailwind classes reference design tokens

### 7.2 Spacing & Typography
- [ ] Consistent spacing using design tokens (sm, md, lg, xl)
- [ ] Font sizes scale appropriately
- [ ] Line heights readable
- [ ] Headings use proper hierarchy (h1, h2, h3)

### 7.3 Tailwind CSS Classes
- [ ] All custom colors work: `bg-primary`, `text-neutral-900`
- [ ] Border radius: `rounded-xl`, `rounded-lg` work correctly
- [ ] Responsive classes: `md:grid-cols-2`, `lg:flex` work correctly

---

## 8. SEO & Meta Tags ✅

### 8.1 Meta Tags in HTML Head
- [ ] `<title>` tag present and dynamic
- [ ] `<meta name="description">` present
- [ ] `<meta property="og:title">` for Facebook
- [ ] `<meta property="og:description">` for Facebook
- [ ] `<meta property="og:image">` (update to actual image in production)
- [ ] `<meta property="og:url">` (update to production URL)
- [ ] `<meta property="og:locale" content="pt_BR">` for Portuguese
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<meta name="theme-color">` matches brand color
- [ ] `<html lang="pt-BR">` for language

### 8.2 Open Graph Preview (Social Media)
- [ ] LinkedIn share preview shows correct title/description
- [ ] Facebook share preview shows correct title/description
- [ ] og:image placeholder visible (update URL in production)

---

## 9. Build Validation ✅

### 9.1 TypeScript Strict Mode
```bash
npm run typecheck
```
- [ ] ✅ **PASSED** - No TypeScript errors

### 9.2 ESLint Validation
```bash
npm run lint
```
- [ ] ✅ **PASSED** - No ESLint errors (version warning only)

### 9.3 Production Build
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] `dist/` folder generated
- [ ] Bundle size reasonable
- [ ] Source maps included

### 9.4 Production Preview
```bash
npm run preview
```
- [ ] App runs correctly from production build
- [ ] All navigation works
- [ ] Styles applied correctly
- [ ] API calls work

---

## 10. Documentation ✅

### 10.1 README.md Updates
- [ ] Project overview present
- [ ] Architecture section explains WordPress headless CMS
- [ ] Setup instructions provided
- [ ] Environment variables documented
- [ ] Production deployment guide included
- [ ] Local WP (Local by Flywheel) setup mentioned

### 10.2 Code Comments
- [ ] Components have comments explaining complex logic
- [ ] API functions have JSDoc comments
- [ ] Design tokens have usage examples

### 10.3 .env.example File
- [ ] `VITE_WP_API_URL` documented with examples
- [ ] Local WP example provided
- [ ] Production example provided
- [ ] File not committed to repo (in .gitignore)

---

## 11. Production Readiness Checklist ✅

### 11.1 Performance
- [ ] Page load time < 3 seconds (initial load)
- [ ] Interaction to Paint (FCP) < 2 seconds
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] No layout shifts (CLS = 0)

### 11.2 Security
- [ ] No console errors about CORS
- [ ] No mixed HTTP/HTTPS content warnings
- [ ] No sensitive data in frontend code
- [ ] Environment variables not exposed

### 11.3 Polish
- [ ] Smooth transitions between pages
- [ ] Loading states feel natural
- [ ] Error messages are helpful
- [ ] No typos in UI text (Portuguese)
- [ ] Brand colors applied consistently
- [ ] Hover/focus states work smoothly

---

## Test Execution Notes

**Date Tested**: _______________  
**Tested By**: _________________  
**Browser/Version**: _____________  

### Issues Found:
1. _________________________________
2. _________________________________
3. _________________________________

### Notes:
_________________________________
_________________________________

---

## Summary

**Phase 1 Completion Status**: 
- [ ] All 11 tasks completed and tested
- [ ] Ready for client presentation
- [ ] Presentation-ready prototype achieved

**Next Phase (Phase 2)**: Advanced features and enhancements based on client feedback.

