# UI Sandbox Library

A modern, production-ready React UI component library built with Vite, TypeScript, and Tailwind CSS v4. Features a dual-mode build system for both standalone app development and library distribution.

## Features

- 🎨 **shadcn/ui Design System** - New York style components
- ⚡️ **Vite 7** - Lightning-fast builds with SWC
- 🎭 **TypeScript** - Full type safety with strict mode
- 🌈 **Tailwind CSS v4** - Modern utility-first styling with OKLCH color space
- 📚 **Storybook 10** - Interactive component documentation
- 🔄 **Dual-Mode Build** - Works as standalone app OR consumable library
- 📦 **Tree-shakeable** - ESM and CJS exports
- 🌙 **Dark Mode** - Built-in theme support
- ♿️ **Accessible** - Built on Radix UI primitives

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 19.1 |
| Build Tool | Vite | 7.1.7 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.1.16 |
| Components | shadcn/ui | new-york |
| Documentation | Storybook | 10.0.5 |
| Icons | Lucide React | 0.552.0 |

## Getting Started

This project uses **DDEV** for containerized local development with Node.js 22 and pnpm.

### Prerequisites

- [DDEV](https://ddev.readthedocs.io/) installed on your system

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd exp-poc-ui-lib

# Start DDEV environment (automatically installs dependencies)
ddev start
```

### Development

```bash
# Start Vite dev server (https://ui-lib.ddev.site:5173)
ddev pnpm run dev

# Start Storybook (https://ui-lib.ddev.site)
ddev pnpm run storybook

# Run linting
ddev pnpm run lint
```

### Building

```bash
# Build as standalone application
ddev pnpm run build:app

# Build as distributable library
ddev pnpm run build:lib

# Preview production build
ddev pnpm run preview
```

## Available Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary action button
- `destructive` - Danger/delete actions
- `outline` - Secondary bordered button
- `secondary` - Alternative secondary style
- `ghost` - Minimal transparent button
- `link` - Link-styled button
- `amber` - Gradient amber button

**Sizes:**
- `default` (h-9), `sm` (h-8), `lg` (h-10)
- `icon`, `icon-sm`, `icon-lg` - Square icon buttons

**Example:**
```tsx
import { Button } from 'ui-sandbox-library'

<Button variant="default" size="lg">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" asChild>
  <a href="/link">Link Button</a>
</Button>
```

See [USAGE.md](./USAGE.md) for complete API documentation and integration examples.

## Using as a Library

### In Your Next.js Project

1. **Install the library:**

```json
// package.json
{
  "dependencies": {
    "ui-sandbox-library": "file:../exp-poc-ui-lib"
  }
}
```

2. **Import components:**

```tsx
import { Button } from 'ui-sandbox-library'

export default function Page() {
  return (
    <div>
      <Button variant="default">Hello World</Button>
    </div>
  )
}
```

3. **Configure Tailwind CSS** (Important!):

See [USAGE.md](./USAGE.md) for complete Tailwind configuration and next-drupal integration examples.

## Project Structure

```
exp-poc-ui-lib/
├── .ddev/                       # DDEV configuration
│   ├── config.yaml              # Main DDEV config
│   ├── commands/web/pnpm        # Custom pnpm command
│   └── web-build/               # Container customization
├── src/
│   ├── components/
│   │   └── ui/                  # UI component library
│   │       └── button/
│   │           ├── button.tsx
│   │           └── button-variants.tsx
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn helper)
│   ├── stories/                 # Storybook stories
│   │   └── button/
│   │       └── Button.stories.ts
│   ├── index.ts                 # Library entry point
│   ├── index.css                # Global styles & theme
│   ├── App.tsx                  # Demo application
│   └── main.tsx                 # App entry point
├── dist/                        # Build output (generated)
│   ├── index.mjs                # ESM bundle
│   ├── index.cjs                # CommonJS bundle
│   ├── index.d.ts               # TypeScript declarations
│   └── style.css                # Compiled styles
├── package.json                 # Package configuration
├── vite.config.ts               # Vite configuration (dual-mode)
├── tsconfig.lib.json            # Library build config
├── components.json              # shadcn/ui configuration
├── USAGE.md                     # Integration guide
├── CLAUDE.md                    # Development guide
└── README.md                    # This file
```

## Package Exports

The library exports components in multiple formats for maximum compatibility:

```json
{
  "main": "./dist/index.cjs",      // CommonJS
  "module": "./dist/index.mjs",    // ES Modules
  "types": "./dist/index.d.ts"     // TypeScript
}
```

**Available Exports:**
```typescript
// Components
export { Button } from 'ui-sandbox-library'
export { buttonVariants } from 'ui-sandbox-library'

// Utilities
export { cn } from 'ui-sandbox-library'

// Types
export type { VariantProps } from 'ui-sandbox-library'
```

## Styling System

### Theme Variables

Uses OKLCH color space for perceptually uniform colors:

```css
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive
--border, --input, --ring
--radius (with sm, md, lg, xl variants)
```

### Dark Mode

Enable dark mode by adding the `.dark` class to a parent element:

```tsx
<div className="dark">
  <Button>Dark Mode Button</Button>
</div>
```

## DDEV Development Environment

This project **requires DDEV** for local development. DDEV provides a containerized environment with Node.js 22 and pnpm.

### DDEV Commands

```bash
# Environment management
ddev start                       # Start DDEV environment
ddev stop                        # Stop DDEV environment
ddev restart                     # Restart DDEV environment
ddev ssh                         # SSH into the web container

# Development commands (all pnpm commands must use ddev prefix)
ddev pnpm run dev                # Start Vite dev server
ddev pnpm run storybook          # Start Storybook
ddev pnpm run build:lib          # Build as library
ddev pnpm run build:app          # Build as application
ddev pnpm run lint               # Run ESLint

# Access URLs
# Storybook: https://ui-lib.ddev.site
# Vite Dev Server: https://ui-lib.ddev.site:5173
```

### DDEV Configuration Details

- **Project Name**: `ui-lib`
- **Node.js Version**: 22
- **Package Manager**: pnpm (installed via custom Dockerfile)
- **Exposed Ports**: Storybook (6006), Vite (5173)
- **Auto-Install**: Dependencies are automatically installed on `ddev start`

## Adding New Components

1. Create component in `src/components/ui/[name]/`
2. Follow shadcn/ui patterns (CVA variants, Radix primitives)
3. Export in `src/index.ts`
4. Create Storybook story in `src/stories/[name]/`
5. Rebuild library: `ddev pnpm run build:lib`

Example:
```typescript
// src/index.ts
export { Button } from "./components/ui/button/button"
export { Card } from "./components/ui/card/card"  // New component
export { cn } from "./lib/utils"
```

## Scripts Reference

**Note**: All commands must be run through DDEV using `ddev pnpm` prefix.

| Command | Description |
|---------|-------------|
| `ddev pnpm run dev` | Start Vite dev server |
| `ddev pnpm run build` | Full production build |
| `ddev pnpm run build:app` | Build as application |
| `ddev pnpm run build:lib` | Build as library |
| `ddev pnpm run preview` | Preview production build |
| `ddev pnpm run storybook` | Start Storybook server |
| `ddev pnpm run build-storybook` | Build static Storybook |
| `ddev pnpm run lint` | Run ESLint |

## TypeScript Configuration

Three TypeScript configurations:
- `tsconfig.app.json` - Application build
- `tsconfig.lib.json` - Library build (with declarations)
- `tsconfig.node.json` - Node.js scripts

## Contributing

1. Ensure DDEV is running: `ddev start`
2. Add components following shadcn/ui patterns
3. Use CVA for variant styling
4. Ensure TypeScript strict mode compliance
5. Create Storybook stories for new components
6. Export components in `src/index.ts`
7. Run `ddev pnpm run lint` before committing
8. Build the library: `ddev pnpm run build:lib`

## Resources

- [DDEV Documentation](https://ddev.readthedocs.io/)
- [Vite Documentation](https://vite.dev/)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)
- [Radix UI](https://www.radix-ui.com/)

## License

[Your License Here]

## Support

For issues and questions, please see:
- [USAGE.md](./USAGE.md) - Integration and usage guide
- [CLAUDE.md](./CLAUDE.md) - Development guide for Claude Code
