// Export all UI components
export { Space } from "./components/ui/space/space"
export type { SpaceProps, SpaceDirection } from "./components/ui/space/space"

export { Button } from "./components/ui/button/button"
export { buttonVariants } from "./components/ui/button/button-variants"

// Export utilities
export { cn } from "./lib/utils"

// Re-export types that consumers might need
export type { VariantProps } from "class-variance-authority"
