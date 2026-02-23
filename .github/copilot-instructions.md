# Copilot Instructions - Fundação 193 Frontend

## Project Overview
This is a React 18 + TypeScript institutional website for Fundação 193 (a foundation supporting the Fire Department of Distrito Federal, Brazil). Built with Vite, Tailwind CSS, and WordPress headless CMS integration.

**Key Architecture:**
- **Frontend**: React SPA with hash-based routing (no React Router)
- **CMS**: WordPress with custom theme + ACF for dynamic content
- **Content Types**: News, Projects, Partners, Events, Training (via REST API)
- **API Consumption**: Generic `fetchAPI<T>()` pattern with TypeScript types

## Setup & Deployment

### Local Development
1. Create `.env.local` from `.env.example`
2. Set `VITE_WP_API_URL` to local WordPress (e.g., Local WP)
3. Run `npm run dev` (Vite dev server on localhost:5174)

### Production Deployment
- Update `VITE_WP_API_URL` to production WordPress domain in environment
- Run `npm run build` to generate optimized dist/ folder
- Deploy dist/ folder to web server

**Note**: No Supabase needed (removed unused vars) — WordPress is the single source of truth for content.

## Design System & Tokens

### Brand Colors (Design Tokens)
All colors are centralized in `src/constants/ui.ts` for consistency:

```typescript
import { COLORS } from '@/constants/ui';

// Primary brand color
COLORS.primary // '#3d685d' (dark teal)
COLORS.primaryDark // '#2f5349' (hover state)

// Neutral palette for text/backgrounds
COLORS.neutral[50] through COLORS.neutral[900]

// Status colors
COLORS.success, COLORS.warning, COLORS.error, COLORS.info
```

**Usage in Tailwind**: These are automatically available as Tailwind classes:
- `bg-primary`, `hover:bg-primary-dark`
- `text-neutral-900`, `bg-neutral-50`

### Spacing & Typography
Available in `src/constants/ui.ts`:
- `SPACING` - xs, sm, md, lg, xl, 2xl, 3xl
- `TYPOGRAPHY` - font families, sizes
- `TRANSITIONS` - fast, base, slow durations
- `Z_INDEX` - layering constants

## State Management Patterns

**Minimal, React Hooks-only approach** - No Redux, Zustand, or context API. State is managed locally within components:

- **Page Navigation State** (App.tsx): `currentPage` & `isTransitioning` track hash-based page changes
- **Data Fetching Pattern**: Components use `useState` triple for data: `const [data, setData] = useState(T[])`, `loading`, `error`
  - Always initialize with `useState(false)` for loading, `useState(null)` for error
  - Use `try-catch-finally` in async effect, set states in each block
  - Include `loadData()` function that can be called to retry on error
  - Example: [News.tsx](../src/components/News.tsx) - improved error handling with retry button
- **UI State** (Menu, Dropdowns, Animation): `useState(false)` for booleans, `useState(string | null)` for single selection
  - Header uses `isMenuOpen` + `openDropdown` for mobile/desktop menu management
  - FloatingActions uses `isExpanded`, `isClosing`, `isMuted` states for complex animations
- **Refs for DOM access**: Use `useRef<HTMLDivElement | null>(null)` when needing element references
  - Dropdown management uses `dropdownRefs.current[key]` to track multiple references
  - Prevents StrictMode double-execution with `useRef(false)` flag in page-level components

**No prop drilling**: Keep state local to component scope. Global concerns (page routing) handled in App.tsx only.

## Architecture & Key Patterns

### Routing System
- **Hash-based routing** (no React Router) in App.tsx: Uses `window.location.hash` for page navigation
- Current page state triggers via `hashchange` event listener with smooth scroll-to-top behavior
- Pages are rendered conditionally in `renderPage()` switch statement
- Document title updates automatically based on current page via `currentPage` state
- Example: `#nossa-historia` → renders `<OurStory />` component

### Component Structure
- **Homepage components** in `src/components/`: Hero, About, Services, Impact, News, Partners, Contact, Header, Footer, FloatingActions
- **Full-page components** in `src/components/pages/`: OurStory, MissionValues, Team, Projects, Training, Events, OurPartnerships, Accounts, Edits, Documents, LGPD, Collaborate
- Header supports smooth scroll navigation to section IDs AND page navigation to hash routes

### Error Handling
- **Global Error Boundary** (App.tsx wrapped in `<ErrorBoundary>`) catches render errors gracefully
- **Component-level errors** show retry buttons with user-friendly messages
- Example: News component shows "Não conseguimos carregar as notícias" with retry button
- Development mode shows error details; production shows user-friendly message

### Styling Conventions
- **Tailwind CSS** only (no CSS modules or styled-components)
- Primary brand color: `#3d685d` (dark teal) with secondary `#2f5349` for hover states
- Consistent utility classes: `text-neutral-900`, `bg-neutral-50`, `rounded-xl`, `px-8 py-4`
- Responsive breakpoints: mobile-first (`sm:`, `lg:`, `md:` prefixes)
- Examples: [Hero.tsx](../src/components/Hero.tsx), [Collaborate.tsx](../src/components/pages/Collaborate.tsx)

### Data Layer & API Integration
- **WordPress REST API** (no Supabase) in [services/api.ts](../src/services/api.ts)
- Generic `fetchAPI<T>()` function for all API calls
- Environment variable: `VITE_WP_API_URL` for WordPress REST API endpoint
- Type-safe API functions: `fetchNoticias()`, `fetchProjetos()`, `fetchParceiros()`, `fetchEventos()`, `fetchCapacitacoes()`
- Type definitions in `src/types/`: news, projects, partners, events, training (all extend WordPress REST API response shapes with ACF fields)

### Custom Hooks
- **useScrollAnimation** in `hooks/useScrollAnimation.ts`: Intersection Observer pattern for scroll-triggered animations
  - Returns `{ elementRef, isVisible }` - attach `ref` to trigger element, use `isVisible` for conditional CSS/animations
  - Configurable threshold (default 0.1)

### Icon Library
- **lucide-react** for all icons (ArrowLeft, Heart, QrCode, Menu, X, ChevronDown, ArrowRight, etc.)
- Consistent sizing: `size={16}` for inline, `size={20}` for medium, `size={32}` for prominent

## Development Workflow

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint validation
npm run typecheck  # TypeScript type checking (no emit)
```

## Environment Variables Setup

Create `.env.local` in project root (git-ignored, never commit). Reference `.env.example`:

```ini
# WordPress REST API for content (news, projects, partners, events, training)
# Local: use Local WP or your local WordPress instance
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2

# Production: update to your live WordPress domain
# VITE_WP_API_URL=https://api.fundacao193.org.br/wp-json/wp/v2
```

**Usage in code**:
- Access with `import.meta.env.VITE_WP_API_URL` (Vite exposes as `import.meta.env`)
- Defined in [services/api.ts](../src/services/api.ts): `const API_URL = import.meta.env.VITE_WP_API_URL`
- Environment variables must be prefixed with `VITE_` to be exposed to frontend
- No `.env` committed to repo - use `.env.local` and `.env.example`

## Testing Patterns

**No automated tests currently implemented** - This is aspirational. When adding tests:
- Use **Vitest** (Vite-native, faster than Jest)
- Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom`
- Place tests next to components: `Header.test.tsx` beside `Header.tsx`
- Testing Library patterns (query by role, not class):
  ```tsx
  render(<Header />);
  expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  ```

## Component Examples & Patterns

### 1. Data-Fetching Component (News.tsx) - With Error Handling & Retry
Demonstrates: async loading, improved error handling, data rendering, retry logic

```tsx
// Fetch on mount with useEffect, manage loading/error states
const [news, setNews] = useState<news[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Separate function allows retry functionality
const loadNoticias = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchNoticias();
    setNews(data);
  } catch (err) {
    setError('Não conseguimos carregar as notícias no momento. Tente novamente mais tarde.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadNoticias();
}, []);

// Conditional render: loading → error with retry → content
if (loading) return <LoadingState />;
if (error) return <ErrorState onRetry={loadNoticias} message={error} />;
return <section>{news.map(...)}</section>;
```

### 2. Complex UI State (Header.tsx) - Type-Safe Dropdowns
Demonstrates: dropdown menus, mobile menu toggle, discriminated union types

```tsx
// Multiple UI states for different concerns
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

// Type-safe menu items with discriminated union (no 'any' type)
type NavItem = 
  | { label: string; href: string }
  | { label: string; dropdown: { label: string; href: string }[] };

// Guard function for type narrowing
const hasDropdown = (item: NavItem): item is Extract<NavItem, { dropdown: unknown }> => {
  return 'dropdown' in item && item !== null && typeof item === 'object';
};

// Conditional rendering based on type
{navItems.map((item) => 
  hasDropdown(item) ? <DropdownMenu /> : <NavLink />
)}
```

### 3. Animation with State (FloatingActions.tsx)
Demonstrates: animation sequences, ref management, event listeners

```tsx
// State for animation phases
const [isExpanded, setIsExpanded] = useState(false);
const [isClosing, setIsClosing] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);

// Staggered state changes for animation timing
const handleToggle = () => {
  if (isExpanded) {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 200); // Must match CSS transition duration
  } else {
    setIsExpanded(true);
  }
};

// useEffect for one-time setup
useEffect(() => {
  if (audioRef.current) audioRef.current.volume = 0.5;
}, []);
```

### 4. Page-Level Component with Navigation (Projects.tsx)
Demonstrates: ref flags for StrictMode safety, page-level data fetching, back button

```tsx
// Flag prevents double-fetch in React.StrictMode (dev only issue)
const hasFetched = useRef(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;
  
  async function loadProjects() {
    // ... fetch logic
  }
  loadProjects();
}, []);

// Back button navigation to home
<button onClick={() => window.location.hash = ''}>
  <ArrowLeft size={20} />
  Voltar
</button>
```

### 5. Graceful Data Extraction (Partners.tsx)
Demonstrates: defensive programming with polymorphic data from WordPress ACF fields

```tsx
// ACF field values can be strings, objects, or IDs
const extractLogoUrl = (logoValue: unknown): string => {
  if (!logoValue) return '';
  
  if (typeof logoValue === 'string') return logoValue;
  
  if (typeof logoValue === 'object' && logoValue !== null) {
    const obj = logoValue as Record<string, unknown>;
    if (typeof obj.url === 'string') return obj.url;
  }
  
  return '';
};
```

## Code Quality Standards
- **ESLint config**: eslint.config.js - React Hooks rules, React Refresh, TS-ESLint strict
- **TypeScript**: strict mode in tsconfig.app.json
- **No PropTypes**: Use TypeScript interfaces exclusively
- **Functional components only**: All components are functional with hooks
- **No 'any' types**: Use discriminated unions and proper type guards instead

## Critical Files & Their Purpose
- [App.tsx](../src/App.tsx): Central routing, page state, document title management, wrapped in ErrorBoundary
- [ErrorBoundary.tsx](../src/components/ErrorBoundary.tsx): Global error handling with graceful fallback
- [Header.tsx](../src/components/Header.tsx): Navigation menu with dropdowns, smooth scroll handling
- [services/api.ts](../src/services/api.ts): All WordPress API calls and type imports
- [constants/ui.ts](../src/constants/ui.ts): Design tokens (colors, spacing, typography)
- [tailwind.config.js](../tailwind.config.js): Tailwind configuration using design tokens
- [vite.config.ts](../vite.config.ts): Lucide React optimization (excluded from dependency pre-bundling)

## Language & Content Notes
- **Portuguese (Brazilian)**: All UI text, class names, comments are in Portuguese
- Navigation labels: "Início", "Institucional", "Missão e Valores", "Colabore", etc.
- Page URLs use Portuguese slugs: `#nossa-historia`, `#missao-valores`, `#colabore`

## SEO & Meta Tags
- **index.html**: Comprehensive meta tags for SEO and social media sharing
  - Open Graph tags for Facebook/LinkedIn previews
  - Twitter Card for social sharing
  - Canonical URL (update to production domain)
  - Language: pt-BR
- Update `og:image` URL to point to actual brand image in production

## Integration Points
- **WordPress**: Headless CMS with custom theme + ACF for content management
- **Local Development**: Use Local WP to run WordPress locally
- **Production**: Any WordPress hosting (update API URL in environment)
- **External CDNs**: Pexels (images), QR Server API (QR codes)



## State Management Patterns

**Minimal, React Hooks-only approach** - No Redux, Zustand, or context API. State is managed locally within components:

- **Page Navigation State** ([App.tsx](../src/App.tsx#L28-L32)): `currentPage` & `isTransitioning` track hash-based page changes
- **Data Fetching Pattern**: Components use `useState` triple for data: `const [data, setData] = useState(T[])`, `loading`, `error`
  - Always initialize with `useState(false)` for loading, `useState(null)` for error
  - Use `try-catch-finally` in async effect, set states in each block
  - Example: [News.tsx](../src/components/News.tsx#L10-L12) - data, loading, error pattern
- **UI State** (Menu, Dropdowns, Animation): `useState(false)` for booleans, `useState(string | null)` for single selection
  - Header uses `isMenuOpen` + `openDropdown` for mobile/desktop menu management ([Header.tsx](../src/components/Header.tsx#L5-L6))
  - FloatingActions uses `isExpanded`, `isClosing`, `isMuted` states for complex animations ([FloatingActions.tsx](../src/components/FloatingActions.tsx#L5-L7))
- **Refs for DOM access**: Use `useRef<HTMLDivElement | null>(null)` when needing element references
  - Dropdown management uses `dropdownRefs.current[key]` to track multiple references ([Header.tsx](../src/components/Header.tsx#L7))
  - Prevents StrictMode double-execution with `useRef(false)` flag in Projects.tsx ([Projects.tsx](../src/components/pages/Projects.tsx#L13))

**No prop drilling**: Keep state local to component scope. Global concerns (page routing) handled in App.tsx only.

## Architecture & Key Patterns

### Routing System
- **Hash-based routing** (no React Router) in [App.tsx](../src/App.tsx): Uses `window.location.hash` for page navigation
- Current page state triggers via `hashchange` event listener with smooth scroll-to-top behavior
- Pages are rendered conditionally in `renderPage()` switch statement
- Document title updates automatically based on current page via `currentPage` state
- Example: `#nossa-historia` → renders `<OurStory />` component

### Component Structure
- **Homepage components** in `src/components/`: Hero, About, Services, Impact, News, Partners, Contact, Header, Footer, FloatingActions
- **Full-page components** in `src/components/pages/`: OurStory, MissionValues, Team, Projects, Training, Events, OurPartnerships, Accounts, Edits, Documents, LGPD, Collaborate
- Header supports smooth scroll navigation to section IDs AND page navigation to hash routes

### Styling Conventions
- **Tailwind CSS** only (no CSS modules or styled-components)
- Primary brand color: `#3d685d` (dark teal) with secondary `#2f5349` for hover states
- Consistent utility classes: `text-neutral-900`, `bg-neutral-50`, `rounded-xl`, `px-8 py-4`
- Responsive breakpoints: mobile-first (`sm:`, `lg:`, `md:` prefixes)
- Examples: [Hero.tsx](../src/components/Hero.tsx), [Collaborate.tsx](../src/components/pages/Collaborate.tsx)

### Data Layer & API Integration
- **Supabase client** initialized in [services/api.ts](../src/services/api.ts)
- Generic `fetchAPI<T>()` function for all API calls
- Environment variable: `VITE_WP_API_URL` for WordPress REST API endpoint
- Type-safe API functions: `fetchNoticias()`, `fetchProjetos()`, `fetchParceiros()`, `fetchEventos()`, `fetchCapacitacoes()`
- Type definitions in `src/types/`: news, projects, partners, events, training (all extend WordPress REST API response shapes with ACF fields)

### Custom Hooks
- **useScrollAnimation** in [hooks/useScrollAnimation.ts](../src/hooks/useScrollAnimation.ts): Intersection Observer pattern for scroll-triggered animations
  - Returns `{ elementRef, isVisible }` - attach `ref` to trigger element, use `isVisible` for conditional CSS/animations
  - Configurable threshold (default 0.1)

### Icon Library
- **lucide-react** for all icons (ArrowLeft, Heart, QrCode, Menu, X, ChevronDown, ArrowRight, etc.)
- Consistent sizing: `size={16}` for inline, `size={20}` for medium, `size={32}` for prominent

## Development Workflow

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint validation
npm run typecheck  # TypeScript type checking (no emit)
```

## Environment Variables Setup

Create `.env.local` in project root (git-ignored, never commit). Required variables:

```ini
# WordPress REST API for content (news, projects, partners, events, training)
VITE_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Supabase integration (backend database & authentication)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Usage in code**:
- Access with `import.meta.env.VITE_WP_API_URL` (Vite exposes as `import.meta.env`)
- Checked in [api.ts](../src/services/api.ts#L1): `const API_URL = import.meta.env.VITE_WP_API_URL`
- Environment variables must be prefixed with `VITE_` to be exposed to frontend
- No `.env` committed to repo - provide `.env.example` or document in README

## Testing Patterns

**No automated tests currently implemented** - This is aspirational. When adding tests:
- Use **Vitest** (Vite-native, faster than Jest)
- Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom`
- Place tests next to components: `Header.test.tsx` beside `Header.tsx`
- Testing Library patterns (query by role, not class):
  ```tsx
  render(<Header />);
  expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  ```

## Component Examples & Patterns

### 1. Data-Fetching Component (News.tsx)
Demonstrates: async loading, error handling, data rendering
```tsx
// Fetch on mount with useEffect, manage loading/error states
const [news, setNews] = useState<news[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function loadNoticias() {
    try {
      const data = await fetchNoticias();
      setNews(data);
    } catch (err) {
      setError('Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  }
  loadNoticias();
}, []);

// Conditional render: loading → error → content
if (loading) return <p>Carregando...</p>;
if (error) return <p className="text-red-500">{error}</p>;
return <section>{news.map(...)}</section>;
```

### 2. Complex UI State (Header.tsx)
Demonstrates: dropdown menus, mobile menu toggle, mouse event handling
```tsx
// Multiple UI states for different concerns
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

// Type-safe menu items with discriminated union
type NavItem = 
  | { label: string; href: string }
  | { label: string; dropdown: { label: string; href: string }[] };

// Guard function for type narrowing
const hasDropdown = (item: NavItem): item is Extract<NavItem, { dropdown: any }> => {
  return 'dropdown' in item;
};

// Conditional rendering based on type
{navItems.map((item) => 
  hasDropdown(item) ? <DropdownMenu /> : <NavLink />
)}
```

### 3. Animation with State (FloatingActions.tsx)
Demonstrates: animation sequences, ref management, event listeners
```tsx
// State for animation phases
const [isExpanded, setIsExpanded] = useState(false);
const [isClosing, setIsClosing] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);

// Staggered state changes for animation timing
const handleToggle = () => {
  if (isExpanded) {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 200); // Must match CSS transition duration
  } else {
    setIsExpanded(true);
  }
};

// useEffect for one-time setup
useEffect(() => {
  if (audioRef.current) audioRef.current.volume = 0.5;
}, []);
```

### 4. Page-Level Component with Navigation (Projects.tsx)
Demonstrates: ref flags for StrictMode safety, page-level data fetching, back button
```tsx
// Flag prevents double-fetch in React.StrictMode (dev only issue)
const hasFetched = useRef(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;
  
  async function loadProjects() {
    // ... fetch logic
  }
  loadProjects();
}, []);

// Back button navigation to home
<button onClick={() => window.location.hash = ''}>
  <ArrowLeft size={20} />
  Voltar
</button>
```

### 5. Graceful Data Extraction (Partners.tsx)
Demonstrates: defensive programming with polymorphic data from WordPress ACF fields
```tsx
// ACF field values can be strings, objects, or IDs
const extractLogoUrl = (logoValue: unknown): string => {
  if (!logoValue) return '';
  
  if (typeof logoValue === 'string') return logoValue;
  
  if (typeof logoValue === 'object' && logoValue !== null) {
    const obj = logoValue as Record<string, unknown>;
    if (typeof obj.url === 'string') return obj.url;
  }
  
  return '';
};
```

## Code Quality Standards
- **ESLint config**: [eslint.config.js](../eslint.config.js) - React Hooks rules, React Refresh, TS-ESLint strict
- **TypeScript**: strict mode in [tsconfig.app.json](../tsconfig.app.json)
- **No PropTypes**: Use TypeScript interfaces exclusively
- **Functional components only**: All components are functional with hooks

## Critical Files & Their Purpose
- [App.tsx](../src/App.tsx): Central routing, page state, document title management
- [Header.tsx](../src/components/Header.tsx): Navigation menu with dropdowns, smooth scroll handling
- [services/api.ts](../src/services/api.ts): All API calls and type imports
- [tailwind.config.js](../tailwind.config.js): Minimal config - no custom theme extensions currently
- [vite.config.ts](../vite.config.ts): Lucide React optimization (excluded from dependency pre-bundling)

## Language & Content Notes
- **Portuguese (Brazilian)**: All UI text, class names, comments are in Portuguese
- Navigation labels: "Início", "Institucional", "Missão e Valores", "Colabore", etc.
- Page URLs use Portuguese slugs: `#nossa-historia`, `#missao-valores`, `#colabore`

## Integration Points
- **Supabase**: Backend database and authentication (credentials via environment variables)
- **WordPress REST API**: Source for news, projects, partners via `VITE_WP_API_URL`
- **Pexels/QR Server**: External image CDNs for photos and PIX donation QR code
