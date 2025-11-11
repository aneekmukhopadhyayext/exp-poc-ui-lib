/**
 * AuthButtons Component
 *
 * Authentication UI with login/logout buttons and user greeting.
 * Integrates with Drupal authentication system.
 *
 * @example
 * import { AuthButtons } from '@/components/AuthButtons'
 *
 * // In a server component, get auth status from Drupal
 * const session = await drupal.getAuthSession()
 *
 * <AuthButtons
 *   isAuthenticated={!!session}
 *   username={session?.user?.display_name}
 * />
 */

'use client'

import { Button } from 'ui-sandbox-library'
import { useRouter } from 'next/navigation'
import { LogIn, LogOut, UserPlus, User } from 'lucide-react'
import { useState } from 'react'

interface AuthButtonsProps {
  isAuthenticated: boolean
  username?: string
  loginUrl?: string
  registerUrl?: string
  logoutUrl?: string
}

export function AuthButtons({
  isAuthenticated,
  username,
  loginUrl = '/user/login',
  registerUrl = '/user/register',
  logoutUrl = '/api/auth/logout',
}: AuthButtonsProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        router.refresh()
        router.push('/')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        {/* User Greeting */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {username || 'User'}
          </span>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {/* Login Button */}
      <Button variant="outline" size="sm" asChild>
        <a href={loginUrl}>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </a>
      </Button>

      {/* Register Button */}
      <Button variant="default" size="sm" asChild>
        <a href={registerUrl}>
          <UserPlus className="mr-2 h-4 w-4" />
          Sign Up
        </a>
      </Button>
    </div>
  )
}

/**
 * Compact version for mobile/small screens
 */
export function AuthButtonsCompact({
  isAuthenticated,
  username,
  loginUrl = '/user/login',
  logoutUrl = '/api/auth/logout',
}: Omit<AuthButtonsProps, 'registerUrl'>) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch(logoutUrl, { method: 'POST', credentials: 'include' })
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleLogout}
        disabled={isLoggingOut}
        title={`Logout ${username || 'user'}`}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon-sm" asChild title="Login">
      <a href={loginUrl}>
        <LogIn className="h-4 w-4" />
      </a>
    </Button>
  )
}
