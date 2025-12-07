import type { Meta, StoryObj } from "@storybook/react"
import { Space } from "@/components/ui/space/space"

const meta = {
  title: "Layout/Space",
  component: Space,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
      description: "Direction determines whether size applies to height, width, or both",
    },
    size: {
      control: "text",
      description: "Size of the space (number in px or CSS value like '2rem', '96px')",
    },
  },
} satisfies Meta<typeof Space>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: "vertical",
    size: "96px",
  },
  render: (args) => (
    <div>
      <div className="rounded-lg border-2 border-primary bg-primary/10 p-4">
        Content Above
      </div>
      <Space {...args} />
      <div className="rounded-lg border-2 border-primary bg-primary/10 p-4">
        Content Below
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          <strong>Direction:</strong> {args.direction}
        </p>
        <p>
          <strong>Size:</strong> {args.size}
        </p>
        <p className="mt-2">
          {args.direction === "vertical" && "Creates vertical space (height)"}
          {args.direction === "horizontal" && "Creates horizontal space (width)"}
          {args.direction === "both" && "Creates space in both dimensions"}
        </p>
      </div>
    </div>
  ),
}
