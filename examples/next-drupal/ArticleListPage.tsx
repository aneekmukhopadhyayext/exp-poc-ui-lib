/**
 * ArticleListPage Component
 *
 * A complete page example showing a filterable article list with Drupal content.
 * Demonstrates integration of multiple UI Sandbox Library components with next-drupal.
 *
 * @example
 * // app/articles/page.tsx
 * import { drupal } from '@/lib/drupal'
 * import { ArticleListPage } from '@/components/ArticleListPage'
 *
 * export default async function ArticlesPage() {
 *   const nodes = await drupal.getResourceCollection('node--article')
 *   const categories = await drupal.getResourceCollection('taxonomy_term--category')
 *
 *   return <ArticleListPage nodes={nodes} categories={categories} />
 * }
 */

'use client'

import { useState } from 'react'
import { DrupalNode, DrupalTaxonomyTerm } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import { ArticleCard } from './ArticleCard'
import { Filter, Grid, List } from 'lucide-react'

interface ArticleListPageProps {
  nodes: DrupalNode[]
  categories: DrupalTaxonomyTerm[]
}

type ViewMode = 'grid' | 'list'

export function ArticleListPage({ nodes, categories }: ArticleListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Filter nodes by category
  const filteredNodes = selectedCategory
    ? nodes.filter(
        (node) =>
          node.field_category?.id === selectedCategory ||
          node.field_categories?.some((cat: any) => cat.id === selectedCategory)
      )
    : nodes

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground">
          Browse our collection of {nodes.length} articles
        </p>
      </div>

      {/* Filters and View Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />

          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Articles
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon-sm"
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <Grid className="h-4 w-4" />
          </Button>

          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon-sm"
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      {selectedCategory && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredNodes.length} of {nodes.length} articles
        </div>
      )}

      {/* Article Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {filteredNodes.map((node) => (
          <ArticleCard key={node.id} node={node} />
        ))}
      </div>

      {/* Empty State */}
      {filteredNodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No articles found in this category.
          </p>
          <Button variant="outline" onClick={() => setSelectedCategory(null)}>
            View All Articles
          </Button>
        </div>
      )}

      {/* Load More (Pagination Example) */}
      {filteredNodes.length > 0 && filteredNodes.length >= 9 && (
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}
