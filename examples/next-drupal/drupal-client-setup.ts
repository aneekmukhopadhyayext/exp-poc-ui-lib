/**
 * Drupal Client Configuration
 *
 * This file shows how to set up the next-drupal client for use with
 * UI Sandbox Library components.
 *
 * Place this file at: lib/drupal.ts in your Next.js project
 */

import { DrupalClient } from 'next-drupal'

// Initialize the Drupal client
export const drupal = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string,
  {
    // Authentication configuration
    auth: {
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
    },

    // Optional: Enable debugging
    debug: process.env.NODE_ENV === 'development',

    // Optional: Custom headers
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },

    // Optional: Configure fetch options
    fetcher: (url, options) => {
      return fetch(url, {
        ...options,
        // Add custom options like cache control
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      })
    },
  }
)

/**
 * Helper function to fetch articles with filtering
 */
export async function getArticles(options?: {
  category?: string
  limit?: number
  offset?: number
}) {
  const params: Record<string, string> = {}

  if (options?.category) {
    params['filter[field_category.id]'] = options.category
  }

  if (options?.limit) {
    params['page[limit]'] = String(options.limit)
  }

  if (options?.offset) {
    params['page[offset]'] = String(options.offset)
  }

  return drupal.getResourceCollection('node--article', {
    params,
    // Include related resources
    withAuth: false, // Set to true if authentication is required
  })
}

/**
 * Helper function to fetch a single article by path
 */
export async function getArticleByPath(path: string) {
  return drupal.getResourceByPath(`/articles${path}`, {
    withAuth: false,
  })
}

/**
 * Helper function to fetch taxonomy terms
 */
export async function getCategories() {
  return drupal.getResourceCollection('taxonomy_term--category', {
    params: {
      'sort': 'weight,name',
    },
  })
}

/**
 * Helper function to fetch menu items
 */
export async function getMenu(menuName: string) {
  return drupal.getMenu(menuName, {
    withAuth: false,
  })
}

/**
 * Helper function to submit a webform
 */
export async function submitWebform(
  formId: string,
  data: Record<string, unknown>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webform_id: formId,
        ...data,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Form submission failed')
  }

  return response.json()
}

/**
 * Environment variables type definitions
 * Add these to your .env.local file:
 *
 * NEXT_PUBLIC_DRUPAL_BASE_URL=https://your-drupal-site.com
 * DRUPAL_CLIENT_ID=your-client-id
 * DRUPAL_CLIENT_SECRET=your-client-secret
 */
