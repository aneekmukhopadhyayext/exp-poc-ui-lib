import * as React from "react"
import { cn } from "@/lib/utils"

export type SpaceDirection = "vertical" | "horizontal" | "both"

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: SpaceDirection
  size?: number | string
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ direction = "vertical", size = "1rem", className, style, ...props }, ref) => {
    const sizeValue = typeof size === "number" ? `${size}px` : size

    const dimensionStyle =
      direction === "vertical"
        ? { height: sizeValue }
        : direction === "horizontal"
        ? { width: sizeValue }
        : { height: sizeValue, width: sizeValue }

    return (
      <div
        ref={ref}
        className={cn("shrink-0 bg-muted/30", className)}
        style={{ ...dimensionStyle, ...style }}
        {...props}
      />
    )
  }
)

Space.displayName = "Space"

export { Space }
