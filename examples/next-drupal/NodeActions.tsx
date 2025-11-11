/**
 * NodeActions Component
 *
 * Renders action buttons dynamically based on Drupal menu items.
 * Useful for node-specific actions or contextual links.
 *
 * @example
 * import { NodeActions } from '@/components/NodeActions'
 *
 * const menuItems = await drupal.getMenu('node-actions')
 * <NodeActions menuItems={menuItems.items} />
 */

'use client'

import { DrupalMenuLinkContent } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import Link from 'next/link'

interface NodeActionsProps {
  menuItems: DrupalMenuLinkContent[]
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function NodeActions({
  menuItems,
  variant = 'outline',
  size = 'default',
}: NodeActionsProps) {
  if (!menuItems || menuItems.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {menuItems.map((item) => {
        // Primary action (weight 0) gets default variant
        const buttonVariant =
          item.weight === 0 ? 'default' : variant

        return (
          <Button
            key={item.id}
            variant={buttonVariant}
            size={size}
            asChild
          >
            <Link href={item.url}>
              {item.title}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
