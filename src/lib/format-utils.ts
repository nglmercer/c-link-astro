import type { UserProfile } from '../types/linktree'

/**
 * Formats a display name or username into a safe string
 */
export function formatDisplayName(profile: UserProfile): string {
  const username = profile.username || 'user'
  return profile.displayName || `@${username}`
}

/**
 * Format link count for display
 */
export function formatLinkCount(count: number): string {
  if (count === 0) return 'No links yet'
  if (count === 1) return '1 link'
  return `${count} links`
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Reserved routes that cannot be used as usernames
 */
export const RESERVED_ROUTES = ['dashboard', 'signin', 'api', 'assets', 'favicon', 'index']

/**
 * Check if a username is a reserved route
 */
export function isReservedRoute(username: string): boolean {
  if (!username) return true
  return RESERVED_ROUTES.includes(username.toLowerCase())
}

/**
 * Build profile description for SEO
 */
export function buildProfileDescription(profile: UserProfile, username: string): string {
  const bioPart = profile.bio ? ` - ${profile.bio}` : ''
  const linksCount = profile.links?.length || 0
  return `${profile.displayName || username}${bioPart} | ${linksCount} links on C-Link`
}
