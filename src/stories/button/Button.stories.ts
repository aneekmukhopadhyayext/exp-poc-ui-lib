import type { Meta, StoryObj } from '@storybook/react-vite'

import React from 'react'
import { ShieldXIcon, SaveIcon, ShareIcon } from 'lucide-react'

import { Button } from '../../components/ui/button/button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
      defaultValue: 'default',
    },
    children: {
      control: { type: 'select' },
      description: 'The content of the button',
      options: ['click-me', 'google-button', 'shield-icon', 'save-icon', 'share-badge'],
      mapping: {
        'click-me': 'Click Me',
        'google-button': (
          React.createElement(React.Fragment, null,
            React.createElement('img', {
              src: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto',
              alt: 'Google Icon',
              className: 'size-5'
            }),
            React.createElement('span', {
              className: 'flex flex-1 justify-center'
            }, 'Continue with Google')
          )
        ),
        'shield-icon': React.createElement(ShieldXIcon),
        'save-icon': React.createElement(SaveIcon),
        'share-badge': (
          React.createElement('span', {
            className: 'bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full'
          }, React.createElement(ShareIcon))
        ),
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
  }
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'default',
  },
}

export const Outline: Story = {
  args: {
    children: 'Click Me',
    variant: 'outline',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Click Me',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Click Me',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Click Me',
    variant: 'link',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Amber: Story = {
  args: {
    children: 'Click Me',
    variant: 'amber',
  },
}