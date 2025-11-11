# Next-Drupal Integration Examples

This directory contains example components demonstrating how to integrate UI Sandbox Library with next-drupal applications.

## Examples Included

1. **ArticleCard.tsx** - Display Drupal article nodes with action buttons
2. **NodeActions.tsx** - Dynamic action buttons from Drupal menu items
3. **ModerationActions.tsx** - Content moderation workflow buttons
4. **AuthButtons.tsx** - Authentication UI with login/logout
5. **ArticleListPage.tsx** - Full page example with filtering

## Usage

Copy these components into your Next.js + next-drupal project and customize as needed.

## Prerequisites

```bash
pnpm add next-drupal ui-sandbox-library lucide-react
```

## Configuration

Ensure your Next.js project has:
- Tailwind CSS configured to scan the library
- next-drupal configured with your Drupal backend
- Component CSS variables defined

See the main [USAGE.md](../../USAGE.md) for complete setup instructions.

## Component Structure

```
your-nextjs-app/
├── components/
│   ├── ArticleCard.tsx
│   ├── NodeActions.tsx
│   ├── ModerationActions.tsx
│   └── AuthButtons.tsx
├── app/
│   └── articles/
│       └── page.tsx
└── lib/
    └── drupal.ts  # Drupal client configuration
```

## Drupal Client Setup

```typescript
// lib/drupal.ts
import { DrupalClient } from "next-drupal"

export const drupal = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
    auth: {
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
    },
  }
)
```

## Environment Variables

```env
NEXT_PUBLIC_DRUPAL_BASE_URL=https://your-drupal-site.com
DRUPAL_CLIENT_ID=your-client-id
DRUPAL_CLIENT_SECRET=your-client-secret
```

## Customization

All examples use the Button component from ui-sandbox-library. You can:
- Change button variants and sizes
- Add more Lucide React icons
- Extend with additional UI components as they're added to the library
- Customize styling with Tailwind classes
