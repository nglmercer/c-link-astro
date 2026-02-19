// Profile utilities - reusable functions for profile pages

import { clerkClient } from '@clerk/astro/server'
import type { AstroGlobal } from 'astro'
import type { UserProfile, Link, ThemeName } from '../types/linktree'

// Re-export types for convenience
export type { UserProfile, Link, ThemeName }

// ============================================
// Types
// ============================================

export interface PlatformIcon {
  icon: string
  color: string
}

export interface Theme {
  background: string
  cardBg: string
  text: string
  subtext: string
}

export interface ThemeConfig {
  [key: string]: Theme
}

// ============================================
// Theme Configurations
// ============================================

export const themes: ThemeConfig = {
  gradient: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#1f2937',
    subtext: '#6b7280'
  },
  ocean: {
    background: 'linear-gradient(180deg, #0c1929 0%, #1a365d 100%)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    subtext: '#94a3b8'
  },
  sunset: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#1f2937',
    subtext: '#6b7280'
  },
  forest: {
    background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#1f2937',
    subtext: '#6b7280'
  },
  dark: {
    background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
    cardBg: 'rgba(31, 41, 55, 0.8)',
    text: '#f9fafb',
    subtext: '#9ca3af'
  },
  light: {
    background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
    cardBg: '#ffffff',
    text: '#111827',
    subtext: '#6b7280'
  }
}

// Default theme
export const DEFAULT_THEME: ThemeName = 'gradient'

// ============================================
// Platform Icons
// ============================================

const platformIcons: Record<string, PlatformIcon> = {
  'github': { icon: 'code', color: '#24292e' },
  'twitter': { icon: 'tag', color: '#1da1f2' },
  'x.com': { icon: 'tag', color: '#000000' },
  'instagram': { icon: 'photo_camera', color: '#e4405f' },
  'youtube': { icon: 'play_circle', color: '#ff0000' },
  'linkedin': { icon: 'work', color: '#0a66c2' },
  'tiktok': { icon: 'music_note', color: '#000000' },
  'discord': { icon: 'chat', color: '#5865f2' },
  'twitch': { icon: 'sports_esports', color: '#9146ff' },
  'reddit': { icon: 'forum', color: '#ff4500' },
  'medium': { icon: 'article', color: '#000000' },
  'codepen': { icon: 'code', color: '#1a1a1a' },
  'stackoverflow': { icon: 'help', color: '#f48024' },
  'dribbble': { icon: 'palette', color: '#ea4c89' },
  'behance': { icon: 'palette', color: '#1769ff' },
  'snapchat': { icon: 'chat', color: '#fffc00' },
  'whatsapp': { icon: 'chat', color: '#25d366' },
  'telegram': { icon: 'send', color: '#0088cc' },
  'email': { icon: 'email', color: '#ea4335' },
  'website': { icon: 'language', color: '#4285f4' },
  'spotify': { icon: 'music_note', color: '#1db954' },
  'soundcloud': { icon: 'music_note', color: '#ff5500' },
  'bandcamp': { icon: 'music_note', color: '#629aa9' },
  'figma': { icon: 'design_services', color: '#f24e1e' },
  'deviantart': { icon: 'palette', color: '#05cc47' },
  'artstation': { icon: 'palette', color: '#13aff0' },
  'stackoverflow': { icon: 'help', color: '#f48024' },
  'npm': { icon: 'inventory_2', color: '#cb3837' },
  'docker': { icon: 'inventory_2', color: '#2496ed' },
  'aws': { icon: 'cloud', color: '#ff9900' },
  'vercel': { icon: 'rocket_launch', color: '#000000' },
  'netlify': { icon: 'cloud', color: '#00dc7d' },
  'heroku': { icon: 'cloud', color: '#430098' },
  'paypal': { icon: 'payments', color: '#003087' },
  'patreon': { icon: 'favorite', color: '#ff424d' },
  'ko-fi': { icon: 'coffee', color: '#ff5e5b' },
  'buymeacoffee': { icon: 'coffee', color: '#fd0' },
  'slack': { icon: 'chat', color: '#4a154b' },
  'teams': { icon: 'chat', color: '#6264a7' },
  'zoom': { icon: 'videocam', color: '#2d8cff' },
  'skype': { icon: 'chat', color: '#00aff0' },
  'messenger': { icon: 'chat', color: '#0084ff' },
  'wechat': { icon: 'chat', color: '#07c160' },
  'line': { icon: 'chat', color: '#06c755' },
  'viber': { icon: 'chat', color: '#7360f2' }
}

// Default icon
const defaultPlatformIcon: PlatformIcon = { icon: 'link', color: '#6b7280' }

// ============================================
// Utility Functions
// ============================================

/**
 * Get platform icon for a URL
 */
export function getPlatformIcon(url: string): PlatformIcon {
  try {
    const domain = new URL(url).hostname.replace('www.', '').toLowerCase()
    
    for (const [key, value] of Object.entries(platformIcons)) {
      if (domain.includes(key)) {
        return value
      }
    }
    
    return defaultPlatformIcon
  } catch {
    return defaultPlatformIcon
  }
}

/**
 * Get domain from URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * Get theme by name
 */
export function getTheme(themeName: ThemeName = DEFAULT_THEME): Theme {
  return themes[themeName] || themes[DEFAULT_THEME]
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
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
  return name.charAt(0).toUpperCase()
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

// ============================================
// Render Functions
// ============================================

/**
 * Generate HTML for a link card
 */
export function renderLinkCard(link: Link, index: number): string {
  const platform = getPlatformIcon(link.url)
  const domain = getDomain(link.url)
  
  return `
    <li class="link-item" style="animation-delay: ${index * 0.08}s">
      <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="link-card">
        <div class="link-icon" style="background: ${platform.color}15; color: ${platform.color}">
          <span class="material-symbols-outlined">${platform.icon}</span>
        </div>
        <div class="link-content">
          <span class="link-title">${escapeHtml(link.title)}</span>
          <span class="link-url">${escapeHtml(domain)}</span>
        </div>
        <span class="material-symbols-outlined link-arrow">open_in_new</span>
      </a>
    </li>
  `
}

/**
 * Generate HTML for empty links state
 */
export function renderEmptyLinks(): string {
  return `
    <li class="empty-link">
      <span class="material-symbols-outlined">link_off</span>
      <span>No links yet</span>
    </li>
  `
}

/**
 * Generate HTML for not found state
 */
export function renderNotFound(username: string): string {
  return `
    <div class="not-found-content">
      <div class="not-found-icon">
        <span class="material-symbols-outlined">link_off</span>
      </div>
      <h2>Page not found</h2>
      <p>This link tree doesn't exist or hasn't been claimed yet.</p>
      <a href="/dashboard" class="cta-button">
        <span class="material-symbols-outlined">add</span>
        Create your own
      </a>
    </div>
  `
}

/**
 * Generate HTML for loading state
 */
export function renderLoading(): string {
  return `
    <div class="loading">
      <div class="spinner"></div>
      <span>Loading profile...</span>
    </div>
  `
}

/**
 * Generate all links HTML
 */
export function renderLinks(links: Link[]): string {
  if (links.length === 0) {
    return renderEmptyLinks()
  }
  
  return links.map((link, index) => renderLinkCard(link, index)).join('')
}

// ============================================
// Client-side Functions (for use in browser)
// ============================================

/**
 * Apply theme to the page
 */
export function applyTheme(themeName: ThemeName = DEFAULT_THEME): void {
  const theme = getTheme(themeName)
  const page = document.getElementById('profile-page')
  
  if (page) {
    page.style.background = theme.background
    page.style.backgroundAttachment = 'fixed'
  }
  
  // Apply to cards
  document.querySelectorAll('.link-card').forEach(card => {
    (card as HTMLElement).style.background = theme.cardBg
    card.style.color = theme.text
  })
  
  const title = document.getElementById('display-name')
  const handle = document.querySelector('.username-handle')
  const bio = document.getElementById('bio')
  
  if (title) (title as HTMLElement).style.color = theme.text
  if (handle) (handle as HTMLElement).style.color = theme.subtext
  if (bio) (bio as HTMLElement).style.color = theme.subtext
}

/**
 * Update profile display elements
 */
export function updateProfileDisplay(profile: UserProfile): void {
  // Update display name
  const displayNameEl = document.getElementById('display-name')
  if (profile.displayName && displayNameEl) {
    displayNameEl.textContent = profile.displayName
  }
  
  // Update bio
  const bioEl = document.getElementById('bio')
  if (profile.bio && bioEl) {
    bioEl.textContent = profile.bio
    bioEl.style.display = 'block'
  }
  
  // Update avatar
  const avatarEl = document.getElementById('avatar')
  if (avatarEl && profile.displayName) {
    avatarEl.textContent = getInitials(profile.displayName)
  }
}

/**
 * Show not found state
 */
export function showNotFoundState(): void {
  const loading = document.getElementById('loading')
  const notFound = document.getElementById('not-found')
  const container = document.getElementById('links-list')
  
  if (loading) loading.style.display = 'none'
  if (container) container.style.display = 'none'
  if (notFound) notFound.style.display = 'flex'
  
  applyTheme(DEFAULT_THEME)
}

/**
 * Show loading state
 */
export function showLoadingState(): void {
  const loading = document.getElementById('loading')
  const notFound = document.getElementById('not-found')
  const container = document.getElementById('links-list')
  
  if (loading) loading.style.display = 'flex'
  if (notFound) notFound.style.display = 'none'
  if (container) container.style.display = 'none'
}

/**
 * Render and display profile
 */
export function displayProfile(profile: UserProfile): void {
  const loading = document.getElementById('loading')
  const notFound = document.getElementById('not-found')
  const container = document.getElementById('links-list')
  
  if (loading) loading.style.display = 'none'
  if (notFound) notFound.style.display = 'none'
  if (container) {
    container.style.display = 'flex'
    container.innerHTML = renderLinks(profile.links || [])
  }
  
  // Update profile info
  updateProfileDisplay(profile)
  
  // Apply theme
  applyTheme(profile.theme || DEFAULT_THEME)
}

// ============================================
// Server-side Functions (for SSR/SEO)
// ============================================

/**
 * Reserved routes that cannot be used as usernames
 */
export const RESERVED_ROUTES = ['dashboard', 'signin', 'api', 'assets', 'favicon', 'index']

/**
 * Check if a username is a reserved route
 */
export function isReservedRoute(username: string): boolean {
  return RESERVED_ROUTES.includes(username)
}

/**
 * Find a user by username in Clerk's user list
 */
export async function findUserByUsername(clerk: ReturnType<typeof clerkClient>, username: string): Promise<{
  user: any;
  profile: UserProfile | null;
} | null> {
  try {
    const usersResponse = await clerk.users.getUserList({ limit: 100 })
    const usersArray = Array.isArray(usersResponse) 
      ? usersResponse 
      : (usersResponse.data || [])
    
    const user = usersArray.find((u: any) => {
      const metadata = u.publicMetadata as Record<string, any>
      return metadata?.profile?.username === username
    })
    
    if (!user) return null
    
    const metadata = user.publicMetadata as Record<string, any>
    const profile = metadata?.profile as UserProfile || null
    
    return { user, profile }
  } catch (error) {
    console.error('Error finding user by username:', error)
    return null
  }
}

/**
 * Get profile data for SEO/social previews (server-side)
 */
export async function getProfileForSEO(Astro: AstroGlobal, username: string): Promise<{
  profile: UserProfile | null;
  seoTitle: string;
  seoDescription: string;
}> {
  const defaultTitle = `${username} | C-Link`
  const defaultDescription = `Check out ${username}'s links on C-Link`
  
  try {
    const clerk = clerkClient(Astro)
    const result = await findUserByUsername(clerk, username)
    
    if (!result || !result.profile) {
      return {
        profile: null,
        seoTitle: defaultTitle,
        seoDescription: defaultDescription
      }
    }
    
    const { profile } = result
    const bioPart = profile.bio ? ` - ${profile.bio}` : ''
    const linksCount = profile.links?.length || 0
    
    return {
      profile,
      seoTitle: profile.displayName 
        ? `${profile.displayName} (@${username}) | C-Link` 
        : defaultTitle,
      seoDescription: `${profile.displayName || username}${bioPart} | ${linksCount} links on C-Link`
    }
  } catch (error) {
    console.error('Error fetching profile for SEO:', error)
    return {
      profile: null,
      seoTitle: defaultTitle,
      seoDescription: defaultDescription
    }
  }
}

/**
 * Build profile description for SEO
 */
export function buildProfileDescription(profile: UserProfile, username: string): string {
  const bioPart = profile.bio ? ` - ${profile.bio}` : ''
  const linksCount = profile.links?.length || 0
  return `${profile.displayName || username}${bioPart} | ${linksCount} links on C-Link`
}
