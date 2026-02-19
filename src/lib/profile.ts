import type { UserProfile, Link as LinkType, ThemeName } from '../types/linktree'

// Re-export types for convenience
export type { UserProfile, LinkType as Link, ThemeName }

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
  },
  midnight: {
    background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    text: '#f8fafc',
    subtext: '#94a3b8'
  },
  cyberpunk: {
    background: 'linear-gradient(135deg, #2e1065 0%, #701a75 50%, #4c1d95 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    text: '#f5d0fe',
    subtext: '#d8b4fe'
  },
  marshmallow: {
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    text: '#831843',
    subtext: '#be185d'
  },
  emerald: {
    background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    text: '#ecfdf5',
    subtext: '#a7f3d0'
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
 * Display links using a template
 */
export function displayLinks(container: HTMLElement, links: LinkType[], themeName: ThemeName = DEFAULT_THEME): void {
  const template = document.getElementById('link-template') as HTMLTemplateElement
  const emptyTemplate = document.getElementById('empty-links-template') as HTMLTemplateElement
  
  // Clear container safely
  container.textContent = ''
  
  if (!links || links.length === 0) {
    if (emptyTemplate) {
      container.appendChild(emptyTemplate.content.cloneNode(true))
    }
    return
  }
  
  const theme = getTheme(themeName)
  const fragment = document.createDocumentFragment()
  
  links.forEach((link, index) => {
    if (!template) return
    
    const clone = template.content.cloneNode(true) as DocumentFragment
    const item = clone.querySelector('.link-item') as HTMLElement
    const card = clone.querySelector('.link-card') as HTMLAnchorElement
    const iconWrapper = clone.querySelector('.link-icon') as HTMLElement
    const icon = clone.querySelector('.link-icon .material-symbols-outlined') as HTMLElement
    const title = clone.querySelector('.link-title') as HTMLElement
    const urlDisplay = clone.querySelector('.link-url') as HTMLElement
    const arrow = clone.querySelector('.link-arrow') as HTMLElement
    
    const platform = getPlatformIcon(link.url)
    const domain = getDomain(link.url)
    
    // Set content and styles
    item.style.animationDelay = `${index * 0.1}s`
    
    card.href = link.url
    card.style.background = theme.cardBg
    card.style.color = theme.text
    
    iconWrapper.style.background = `${platform.color}15`
    iconWrapper.style.color = platform.color
    icon.textContent = platform.icon
    
    title.textContent = link.title
    urlDisplay.textContent = domain
    urlDisplay.style.color = theme.subtext
    
    arrow.style.color = theme.subtext
    
    fragment.appendChild(clone)
  })
  
  container.appendChild(fragment)
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
  document.querySelectorAll<HTMLElement>('.link-card').forEach(card => {
    card.style.background = theme.cardBg
    card.style.color = theme.text
  })
  
  // Apply to other elements
  document.querySelectorAll<HTMLElement>('.link-url').forEach(url => {
    url.style.color = theme.subtext
  })
  
  document.querySelectorAll<HTMLElement>('.link-arrow').forEach(arrow => {
    arrow.style.color = theme.subtext
  })
  
  const title = document.getElementById('display-name')
  const handle = document.querySelector('.username-handle') as HTMLElement
  const bio = document.getElementById('bio')
  
  if (title) title.style.color = theme.text
  if (handle) handle.style.color = theme.subtext
  if (bio) bio.style.color = theme.subtext
}

/**
 * Update profile display elements
 */
export function updateProfileDisplay(profile: UserProfile): void {
  // Update display name
  const displayNameEl = document.getElementById('display-name')
  if (displayNameEl) {
    const username = profile.username || 'user'
    displayNameEl.textContent = profile.displayName || `@${username}`
  }
  
  // Update bio
  const bioEl = document.getElementById('bio')
  if (bioEl) {
    if (profile.bio) {
      bioEl.textContent = profile.bio
      bioEl.style.display = 'block'
    } else {
      bioEl.textContent = ''
      bioEl.style.display = 'none'
    }
  }
  
  // Update avatar
  const avatarEl = document.getElementById('avatar')
  if (avatarEl) {
    const text = profile.displayName || profile.username || '?'
    avatarEl.textContent = text.charAt(0).toUpperCase()
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
  const themeName = (profile.theme as ThemeName) || DEFAULT_THEME
  
  if (loading) loading.style.display = 'none'
  if (notFound) notFound.style.display = 'none'
  
  if (container) {
    container.style.display = 'flex'
    displayLinks(container, profile.links || [], themeName)
  }
  
  // Update profile info
  updateProfileDisplay(profile)
  
  // Apply theme
  applyTheme(themeName)
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
/**
 * Build profile description for SEO
 */
export function buildProfileDescription(profile: UserProfile, username: string): string {
  const bioPart = profile.bio ? ` - ${profile.bio}` : ''
  const linksCount = profile.links?.length || 0
  return `${profile.displayName || username}${bioPart} | ${linksCount} links on C-Link`
}

