# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React UI component library built with Vite, TypeScript, and Tailwind CSS v4. The project uses Storybook for component development and documentation, and follows the shadcn/ui design system patterns with the "new-york" style.

**Dual-Mode Build System**: This project can operate both as a standalone application AND as a consumable library for other projects.

## Development Commands

### Running the Application
```bash
pnpm run dev              # Start Vite dev server (default: http://localhost:5173)
pnpm run build            # Type-check with tsc and build for production
pnpm run build:app        # Build as standalone application
pnpm run build:lib        # Build as consumable library (dist/)
pnpm run preview          # Preview production build locally
```

### Storybook
```bash
pnpm run storybook        # Start Storybook dev server on port 6006
pnpm run build-storybook  # Build static Storybook site
```

### Code Quality
```bash
pnpm run lint             # Run ESLint on all files
```

**Note**: This project uses pnpm as the package manager.

## Architecture

### Tech Stack
- **React 19.1** with TypeScript (strict mode enabled)
- **Vite 7** with SWC for Fast Refresh
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **Storybook 10** for component development
- **shadcn/ui** components (new-york style)

### Project Structure
```
src/
├── components/
│   └── ui/              # shadcn/ui components
│       └── button/
│           ├── button.tsx           # Button component
│           └── button-variants.tsx  # Button CVA variants
├── lib/
│   └── utils.ts         # cn() utility for className merging
├── stories/             # Storybook stories and demo components
│   └── button/
│       └── Button.stories.ts
├── assets/              # Static assets
├── index.ts             # Library entry point (exports all components)
├── index.css            # Global styles with Tailwind and theme variables
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

### Library Configuration

This project is configured as a dual-mode build system:

**Application Mode** (default):
- Entry: `src/main.tsx`
- Output: Standard Vite app build in `dist/`
- Run with: `pnpm run dev` or `pnpm run build:app`

**Library Mode**:
- Entry: `src/index.ts`
- Output: Distributable library files in `dist/`
  - `dist/index.mjs` - ESM format
  - `dist/index.cjs` - CommonJS format
  - `dist/index.d.ts` - TypeScript declarations
  - `dist/style.css` - Compiled styles
- Build with: `pnpm run build:lib`
- Configured in `vite.config.ts` (mode: 'lib')
- TypeScript declarations: `tsconfig.lib.json`

**Package Configuration** (`package.json`):
- Exports both ESM and CJS formats
- React/React-DOM as peer dependencies (not bundled)
- External dependencies: Radix UI, CVA, clsx, tailwind-merge
- Supports Node.js package exports for modern module resolution

### Import Aliases
The project uses path aliases configured in both `vite.config.ts` and `tsconfig.app.json`:
- `@/` → `./src/`
- `@/components` → `./src/components`
- `@/lib` → `./src/lib`
- `@/components/ui` → `./src/components/ui`
- `@/hooks` → `./src/hooks`

### Styling System
- **Tailwind CSS v4** with inline `@theme` configuration in `src/index.css`
- **CSS Variables**: Uses OKLCH color space for theme variables
- **Dark Mode**: Implemented via `.dark` class on parent elements (custom variant)
- **Design Tokens**: Predefined radius values (sm, md, lg, xl) and color tokens (background, foreground, primary, secondary, muted, accent, destructive, etc.)
- **Animation**: Uses `tw-animate-css` package for animation utilities

### Component Patterns
- **shadcn/ui Components**: Located in `src/components/ui/`, follow the shadcn/ui architecture
- **Class Variance Authority (CVA)**: Used for variant-based styling (see `button.tsx`)
- **Radix UI**: Primitives like `@radix-ui/react-slot` for composability
- **cn() Helper**: In `src/lib/utils.ts`, merges clsx and tailwind-merge for className composition

### TypeScript Configuration
- **Strict Mode**: Enabled with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`
- **Module Resolution**: Uses "bundler" mode with `verbatimModuleSyntax`
- **Target**: ES2022 with DOM libraries
- **JSX**: React 19's new `react-jsx` transform

### ESLint Configuration
Uses flat config format with:
- TypeScript ESLint recommended rules
- React Hooks rules (`recommended-latest`)
- React Refresh Vite plugin rules
- Storybook plugin (imported but not fully configured in current setup)

## Available Components

### Button Component
**Location**: `src/components/ui/button/`

**Variants**: default, destructive, outline, secondary, ghost, link, amber
**Sizes**: default, sm, lg, icon, icon-sm, icon-lg

**Features**:
- Radix UI Slot pattern for composability (asChild prop)
- CVA-based variant styling
- Focus-visible states with ring styling
- Dark mode support
- Icon support with automatic sizing
- Disabled and aria-invalid states

**Export**: Available via `import { Button, buttonVariants } from 'ui-sandbox-library'`

## Adding New Components

When adding shadcn/ui components:
1. Components should go in `src/components/ui/[component-name]/`
2. Use the configured aliases (`@/lib/utils`, `@/components/ui`)
3. Follow the established pattern: CVA for variants, Radix UI primitives where needed
4. Component config is in `components.json` (style: "new-york", iconLibrary: "lucide")
5. Create corresponding Storybook stories in `src/stories/[component-name]/`
6. **IMPORTANT**: Export the new component in `src/index.ts` for library consumption
7. After adding components, rebuild the library with `pnpm run build:lib`

**Example Adding a New Component**:
```typescript
// src/index.ts
export { Button } from "./components/ui/button/button"
export { Card } from "./components/ui/card/card"  // Add new export
export { cn } from "./lib/utils"
```

## Using as a Library in Other Projects

### Installation

**Local Development** (file reference):
```json
{
  "dependencies": {
    "ui-sandbox-library": "file:../UISandboxLibrary"
  }
}
```

**Git Repository**:
```json
{
  "dependencies": {
    "ui-sandbox-library": "git+https://github.com/username/ui-sandbox-library.git"
  }
}
```

### Usage in Next.js

```tsx
import { Button } from 'ui-sandbox-library'

export default function Page() {
  return <Button variant="default">Click me</Button>
}
```

**Important**: Consuming projects must configure Tailwind to scan the library's components. See `USAGE.md` for complete integration instructions including Tailwind configuration and next-drupal examples.

## Notes
- This project uses the **@vitejs/plugin-react-swc** plugin (React Compiler is NOT compatible with SWC)
- Tailwind CSS v4 requires the `@tailwindcss/vite` plugin instead of PostCSS configuration
- Color system uses OKLCH color space for better perceptual uniformity
- Dark mode is implemented with a custom variant `@custom-variant dark (&:is(.dark *))`
- Package manager: **pnpm** (uses `pnpm-lock.yaml`)
