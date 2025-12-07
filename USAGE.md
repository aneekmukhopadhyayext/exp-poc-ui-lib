# Using UI Sandbox Library in Your Next.js Project

This guide provides comprehensive instructions for integrating the UI Sandbox Library into your Next.js applications, including examples with the `next-drupal` module.

## Table of Contents

- [Building the Library](#building-the-library)
- [Installation](#installation)
- [Next.js Configuration](#nextjs-configuration)
- [Basic Usage](#basic-usage)
- [Component API Reference](#component-api-reference)
- [Next-Drupal Integration](#next-drupal-integration)
- [Theming and Customization](#theming-and-customization)
- [Development Workflow](#development-workflow)

## Building the Library

This library uses **DDEV** for local development. Before using the library in your Next.js project, build it for distribution:

```bash
cd /path/to/exp-poc-ui-lib
ddev start                    # Start DDEV environment (first time)
ddev pnpm install             # Install dependencies (runs automatically on start)
ddev pnpm run build:lib       # Build the library
```

This creates the distributable files in the `dist/` directory:
- `dist/index.mjs` - ESM bundle
- `dist/index.cjs` - CommonJS bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Compiled styles

**Note**: Dependencies are automatically installed via DDEV's post-start hook, but you can manually run `ddev pnpm install` if needed.

## Installation

### Option 1: Local Development (File Reference)

Best for local development and testing:

```json
// your-nextjs-app/package.json
{
  "dependencies": {
    "ui-sandbox-library": "file:../exp-poc-ui-lib"
  }
}
```

Then install:
```bash
pnpm install
```

**Note**: Whenever you rebuild the library (run `ddev pnpm run build:lib` in the library project), reinstall it in your Next.js project:
```bash
pnpm install --force
```

### Option 2: Git Repository

For production or team collaboration:

```json
// your-nextjs-app/package.json
{
  "dependencies": {
    "ui-sandbox-library": "git+https://github.com/yourusername/ui-sandbox-library.git"
  }
}
```

With a specific branch or tag:
```json
{
  "dependencies": {
    "ui-sandbox-library": "git+https://github.com/yourusername/ui-sandbox-library.git#main",
    "ui-sandbox-library": "git+https://github.com/yourusername/ui-sandbox-library.git#v1.0.0"
  }
}
```

### Option 3: npm Registry (When Published)

```bash
pnpm add ui-sandbox-library
```

## Next.js Configuration

### 1. Configure Tailwind CSS

**IMPORTANT**: You must configure Tailwind to scan the library's components.

Create or update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add this line to include the library components
    './node_modules/ui-sandbox-library/dist/**/*.{js,mjs,cjs}',
  ],
  theme: {
    extend: {
      colors: {
        // Optional: Override theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
}

export default config
```

### 2. Import Base Styles (Optional)

If you want to use the library's theme variables, add them to your global CSS:

```css
/* app/globals.css or styles/globals.css */
@import 'ui-sandbox-library/dist/style.css';

/* Or manually copy the CSS variables from the library's src/index.css */
```

Alternatively, define your own theme variables:

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.625rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}
```

### 3. TypeScript Configuration (Optional)

For better IDE support, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "ui-sandbox-library": ["./node_modules/ui-sandbox-library/dist/index.d.ts"]
    }
  }
}
```

## Basic Usage

### Importing Components

```tsx
import { Button } from 'ui-sandbox-library'

export default function Page() {
  return (
    <div>
      <Button variant="default">Click me</Button>
    </div>
  )
}
```

### Client vs Server Components

All components from this library are **Client Components** (they use React hooks and interactivity). Mark your Next.js components with `'use client'` when needed:

```tsx
'use client'

import { Button } from 'ui-sandbox-library'
import { useState } from 'react'

export default function InteractivePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
    </div>
  )
}
```

## Component API Reference

### Button Component

```tsx
import { Button } from 'ui-sandbox-library'
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'amber'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |
| `disabled` | `boolean` | `false` | Disable button |
| `...props` | `React.ComponentProps<"button">` | - | All standard button HTML attributes |

**Examples:**

```tsx
// Basic button
<Button>Click me</Button>

// With variant and size
<Button variant="destructive" size="lg">Delete Account</Button>

// Icon button
<Button variant="outline" size="icon">
  <Search className="h-4 w-4" />
</Button>

// As a link (using asChild)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Disabled state
<Button disabled>Loading...</Button>

// With onClick handler
<Button onClick={() => console.log('Clicked!')}>
  Interactive Button
</Button>
```

## Next-Drupal Integration

The `next-drupal` module helps build Next.js applications with Drupal as the backend. Here are practical examples integrating UI Sandbox Library components with next-drupal.

### Installation

```bash
pnpm add next-drupal
pnpm add ui-sandbox-library
```

### Example 1: Article Card with Action Button

Create a reusable article card component with Drupal content:

```tsx
// components/ArticleCard.tsx
'use client'

import { DrupalNode } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ArticleCardProps {
  node: DrupalNode
}

export function ArticleCard({ node }: ArticleCardProps) {
  return (
    <article className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">{node.title}</h2>

      {node.field_summary && (
        <p className="text-muted-foreground mb-4">{node.field_summary}</p>
      )}

      <div className="flex gap-2">
        <Button variant="default" asChild>
          <Link href={node.path.alias}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href={`/articles/${node.id}/share`}>
            Share
          </Link>
        </Button>
      </div>
    </article>
  )
}
```

### Example 2: Node Actions with Drupal Menu

Create action buttons based on Drupal menu items:

```tsx
// components/NodeActions.tsx
'use client'

import { DrupalMenuLinkContent } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import Link from 'next/link'

interface NodeActionsProps {
  menuItems: DrupalMenuLinkContent[]
}

export function NodeActions({ menuItems }: NodeActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant={item.attributes.weight === 0 ? 'default' : 'outline'}
          asChild
        >
          <Link href={item.attributes.url}>{item.attributes.title}</Link>
        </Button>
      ))}
    </div>
  )
}
```

### Example 3: Content Moderation Actions

Create moderation action buttons for Drupal content:

```tsx
// components/ModerationActions.tsx
'use client'

import { DrupalNode } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import { useState } from 'react'
import { CheckCircle, XCircle, Eye } from 'lucide-react'

interface ModerationActionsProps {
  node: DrupalNode
  onModerate: (action: string) => Promise<void>
}

export function ModerationActions({ node, onModerate }: ModerationActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleModeration = async (action: string) => {
    setIsLoading(true)
    try {
      await onModerate(action)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        disabled={isLoading}
        onClick={() => handleModeration('publish')}
      >
        <CheckCircle className="mr-2 h-4 w-4" />
        Publish
      </Button>

      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => handleModeration('review')}
      >
        <Eye className="mr-2 h-4 w-4" />
        Send to Review
      </Button>

      <Button
        variant="destructive"
        disabled={isLoading}
        onClick={() => handleModeration('archive')}
      >
        <XCircle className="mr-2 h-4 w-4" />
        Archive
      </Button>
    </div>
  )
}
```

### Example 4: Drupal Webform Submit Button

Integrate with Drupal webforms:

```tsx
// app/contact/page.tsx
'use client'

import { Button } from 'ui-sandbox-library'
import { useState } from 'react'
import { drupal } from '@/lib/drupal'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      // Submit to Drupal webform
      await drupal.submitForm('contact', {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      })

      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
        <p className="mb-4">Your message has been sent successfully.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
```

### Example 5: Node Listing with Filter Buttons

Create a filterable node list using Drupal taxonomy:

```tsx
// app/articles/page.tsx
'use client'

import { useState } from 'react'
import { DrupalNode } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import { ArticleCard } from '@/components/ArticleCard'

interface ArticlesPageProps {
  nodes: DrupalNode[]
  categories: { id: string; name: string }[]
}

export default function ArticlesPage({ nodes, categories }: ArticlesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredNodes = selectedCategory
    ? nodes.filter(node =>
        node.field_category?.id === selectedCategory
      )
    : nodes

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Articles</h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
        >
          All Articles
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNodes.map((node) => (
          <ArticleCard key={node.id} node={node} />
        ))}
      </div>

      {filteredNodes.length === 0 && (
        <p className="text-center text-muted-foreground">
          No articles found in this category.
        </p>
      )}
    </div>
  )
}
```

### Example 6: User Authentication Actions

Create login/logout buttons with Drupal authentication:

```tsx
// components/AuthButtons.tsx
'use client'

import { Button } from 'ui-sandbox-library'
import { useRouter } from 'next/navigation'
import { LogIn, LogOut, UserPlus } from 'lucide-react'

interface AuthButtonsProps {
  isAuthenticated: boolean
  username?: string
}

export function AuthButtons({ isAuthenticated, username }: AuthButtonsProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.refresh()
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Welcome, {username}
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <a href="/user/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </a>
      </Button>
      <Button variant="default" size="sm" asChild>
        <a href="/user/register">
          <UserPlus className="mr-2 h-4 w-4" />
          Sign Up
        </a>
      </Button>
    </div>
  )
}
```

## Theming and Customization

### Dark Mode

Enable dark mode by adding the `dark` class to a parent element:

```tsx
// app/layout.tsx
import { Button } from 'ui-sandbox-library'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
```

Or use Next Themes for dynamic theme switching:

```bash
pnpm add next-themes
```

```tsx
// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

### Custom Theme Colors

Override theme colors in your Tailwind config or CSS variables:

```css
/* app/globals.css */
:root {
  --primary: 38 92% 50%; /* Custom primary color in OKLCH */
  --primary-foreground: 0 0% 100%;
}
```

## Development Workflow

### Iterative Development

When developing components in the library and using them in Next.js:

1. **Make changes** to the library components
2. **Rebuild the library** (in the library project):
   ```bash
   cd exp-poc-ui-lib
   ddev pnpm run build:lib
   ```
3. **Reinstall in Next.js** (in your Next.js project):
   ```bash
   cd your-nextjs-app
   pnpm install --force
   ```
4. **Restart Next.js dev server**:
   ```bash
   pnpm run dev
   ```

### Hot Reload Setup (Advanced)

For faster development, you can use `pnpm link`:

```bash
# In the library directory (inside DDEV)
cd exp-poc-ui-lib
ddev pnpm link --global

# In your Next.js project
cd your-nextjs-app
pnpm link --global ui-sandbox-library
```

Now changes to the library will be reflected immediately (you may still need to restart the Next.js dev server).

**Note**: When using DDEV, the linked package is inside the container, so you'll still need to rebuild with `ddev pnpm run build:lib` for changes to take effect.

## Troubleshooting

### Styles Not Appearing

- Ensure Tailwind is configured to scan the library: `'./node_modules/ui-sandbox-library/dist/**/*.{js,mjs,cjs}'`
- Import the library's CSS: `@import 'ui-sandbox-library/dist/style.css'`
- Check that CSS variables are defined in your global CSS

### TypeScript Errors

- Run `pnpm install --force` to ensure types are updated
- Check that `dist/index.d.ts` exists in the library
- Verify `tsconfig.json` paths configuration

### Module Not Found

- Rebuild the library: `ddev pnpm run build:lib` (in the library project)
- Reinstall in Next.js: `pnpm install --force` (in your Next.js project)
- Check that `package.json` dependency path is correct
- Ensure DDEV is running: `ddev start` (in the library project)

## DDEV Development Environment

The UI Sandbox Library uses DDEV for containerized development. This ensures consistent development environments across different machines.

### Key Points

- **All library development commands** must be run through DDEV using the `ddev pnpm` prefix
- **Your Next.js consuming project** uses regular `pnpm` commands (unless it also uses DDEV)
- DDEV automatically installs dependencies when the environment starts
- Storybook and Vite dev server are accessible through DDEV's exposed ports

### Quick Reference

```bash
# Library project (uses DDEV)
ddev start                      # Start the environment
ddev pnpm run storybook        # Run Storybook
ddev pnpm run dev              # Run Vite dev server
ddev pnpm run build:lib        # Build for distribution
ddev stop                       # Stop the environment

# Your Next.js project (regular pnpm)
pnpm install                    # Install dependencies
pnpm run dev                    # Run Next.js dev server
```

### DDEV URLs

When DDEV is running, access the library at:
- **Storybook**: https://ui-lib.ddev.site
- **Vite Dev Server**: https://ui-lib.ddev.site:5173

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-drupal Documentation](https://next-drupal.org/)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [DDEV Documentation](https://ddev.readthedocs.io/)

## Support

For issues specific to:
- **Library development**: See [CLAUDE.md](./CLAUDE.md)
- **Component API**: See [README.md](./README.md)
- **Next-Drupal**: Visit [next-drupal.org](https://next-drupal.org/)
