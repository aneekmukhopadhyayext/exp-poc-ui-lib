/**
 * ModerationActions Component
 *
 * Content moderation workflow buttons for Drupal content.
 * Handles publish, review, and archive actions with loading states.
 *
 * @example
 * import { ModerationActions } from '@/components/ModerationActions'
 *
 * const handleModerate = async (action: string) => {
 *   await drupal.updateResource('node--article', node.id, {
 *     data: { attributes: { moderation_state: action } }
 *   })
 * }
 *
 * <ModerationActions node={node} onModerate={handleModerate} />
 */

'use client'

import { DrupalNode } from 'next-drupal'
import { Button } from 'ui-sandbox-library'
import { useState } from 'react'
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react'

interface ModerationActionsProps {
  node: DrupalNode
  onModerate: (action: string, nodeId: string) => Promise<void>
  availableStates?: string[]
}

const MODERATION_CONFIG = {
  publish: {
    label: 'Publish',
    icon: CheckCircle,
    variant: 'default' as const,
  },
  review: {
    label: 'Send to Review',
    icon: Eye,
    variant: 'outline' as const,
  },
  draft: {
    label: 'Save as Draft',
    icon: Clock,
    variant: 'outline' as const,
  },
  archive: {
    label: 'Archive',
    icon: XCircle,
    variant: 'destructive' as const,
  },
}

export function ModerationActions({
  node,
  onModerate,
  availableStates = ['publish', 'review', 'archive'],
}: ModerationActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const handleModeration = async (action: string) => {
    setIsLoading(true)
    setActiveAction(action)

    try {
      await onModerate(action, node.id)
    } catch (error) {
      console.error(`Moderation action "${action}" failed:`, error)
    } finally {
      setIsLoading(false)
      setActiveAction(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {availableStates.map((state) => {
        const config = MODERATION_CONFIG[state as keyof typeof MODERATION_CONFIG]
        if (!config) return null

        const Icon = config.icon
        const isCurrentlyLoading = isLoading && activeAction === state

        return (
          <Button
            key={state}
            variant={config.variant}
            disabled={isLoading}
            onClick={() => handleModeration(state)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {isCurrentlyLoading ? 'Processing...' : config.label}
          </Button>
        )
      })}

      {/* Current State Indicator */}
      {node.moderation_state && (
        <span className="flex items-center px-3 py-2 text-sm text-muted-foreground border rounded-md">
          Current: {node.moderation_state}
        </span>
      )}
    </div>
  )
}
