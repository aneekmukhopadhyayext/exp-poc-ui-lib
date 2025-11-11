/**
 * ArticleCard Component
 *
 * A reusable card component for displaying Drupal article nodes with
 * action buttons using UI Sandbox Library components.
 *
 * @example
 * import { ArticleCard } from '@/components/ArticleCard'
 *
 * <ArticleCard node={article} />
 */

'use client'

import { DrupalNode } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import Link from 'next/link'
import { ArrowRight, Share2 } from 'lucide-react'

interface ArticleCardProps {
  node: DrupalNode
  showShare?: boolean
}

export function ArticleCard({ node, showShare = true }: ArticleCardProps) {
  return (
    <article className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Article Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
          <Link href={node.path.alias}>{node.title}</Link>
        </h2>

        {/* Author and Date */}
        {(node.uid?.display_name || node.created) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {node.uid?.display_name && (
              <span>By {node.uid.display_name}</span>
            )}
            {node.created && (
              <time dateTime={node.created}>
                {new Date(node.created).toLocaleDateString()}
              </time>
            )}
          </div>
        )}
      </div>

      {/* Article Summary */}
      {node.field_summary && (
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {node.field_summary}
        </p>
      )}

      {/* Tags/Categories */}
      {node.field_tags && node.field_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {node.field_tags.map((tag: any) => (
            <span
              key={tag.id}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="default" size="sm" asChild>
          <Link href={node.path.alias}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {showShare && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`${node.path.alias}/share`}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Link>
          </Button>
        )}
      </div>
    </article>
  )
}
