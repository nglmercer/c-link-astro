// ============================================
// Client-side UI Utilities (DOM Manipulation)
// ============================================

import type { UserProfile, Link as LinkType, ThemeName } from '../types/linktree'
import { getTheme, DEFAULT_THEME } from './theme'
import { getDomain, getFaviconUrl, getPlatformIcon } from './link-utils'

/**
 * Apply theme to the page using CSS variables
 */
export function applyTheme(themeName: ThemeName = DEFAULT_THEME): void {
  const theme = getTheme(themeName)
  const page = document.getElementById('profile-page')
  
  if (!page) return
  
  // Set Semantic CSS Variables
  const vars = {
    '--theme-bg': theme.background,
    '--theme-card-bg': theme.cardBg,
    '--theme-card-border': theme.cardBorder,
    '--theme-text': theme.text,
    '--theme-subtext': theme.subtext,
    '--theme-accent': theme.accent,
    '--theme-glass': theme.glass ? 'blur(16px)' : 'none'
  }
  
  Object.entries(vars).forEach(([key, value]) => {
    page.style.setProperty(key, value)
  })
}

/**
 * Display links in the DOM
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
  
  const fragment = document.createDocumentFragment()
  
  links.forEach((link, index) => {
    if (!template) return
    
    const clone = template.content.cloneNode(true) as DocumentFragment
    const item = clone.querySelector('.link-item') as HTMLElement
    const card = clone.querySelector('.link-card') as HTMLAnchorElement
    const iconWrapper = clone.querySelector('.link-icon') as HTMLElement
    const title = clone.querySelector('.link-title') as HTMLElement
    const urlDisplay = clone.querySelector('.link-url') as HTMLElement
    
    const platform = getPlatformIcon(link.url)
    const domain = getDomain(link.url)
    
    // Set content and styles
    item.style.animationDelay = `${index * 0.1}s`
    card.href = link.url
    
    iconWrapper.style.background = `${platform.color}15`
    iconWrapper.style.color = platform.color
    
    // Clear old icon/image
    iconWrapper.textContent = ''
    
    const thumbType = link.thumbnailType || 'favicon'
    
    if (thumbType === 'favicon') {
      const favicon = getFaviconUrl(link.url)
      if (favicon) {
        const img = document.createElement('img')
        img.src = favicon
        img.className = 'link-favicon'
        img.style.width = '24px'
        img.style.height = '24px'
        img.style.borderRadius = '4px'
        
        const span = document.createElement('span')
        span.className = 'material-symbols-outlined'
        span.textContent = platform.icon
        span.style.display = 'none'
        
        img.onerror = () => {
          img.style.display = 'none'
          span.style.display = 'block'
        }
        
        iconWrapper.appendChild(img)
        iconWrapper.appendChild(span)
      } else {
        const span = document.createElement('span')
        span.className = 'material-symbols-outlined'
        span.textContent = platform.icon
        iconWrapper.appendChild(span)
      }
    } else if (thumbType === 'custom' && link.thumbnailUrl) {
      const img = document.createElement('img')
      img.src = link.thumbnailUrl
      img.className = 'link-custom-image'
      img.style.width = '100%'
      img.style.height = '100%'
      img.style.objectFit = 'cover'
      img.style.borderRadius = '8px'
      
      const span = document.createElement('span')
      span.className = 'material-symbols-outlined'
      span.textContent = 'image'
      span.style.display = 'none'
      
      img.onerror = () => {
        img.style.display = 'none'
        span.style.display = 'block'
      }
      
      iconWrapper.appendChild(img)
      iconWrapper.appendChild(span)
    } else {
      const span = document.createElement('span')
      span.className = 'material-symbols-outlined'
      span.textContent = platform.icon
      iconWrapper.appendChild(span)
    }
    
    title.textContent = link.title
    urlDisplay.textContent = domain
    
    fragment.appendChild(clone)
  })
  
  container.appendChild(fragment)
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
    if (profile.avatarUrl) {
      avatarEl.textContent = ''
      const img = document.createElement('img')
      img.src = profile.avatarUrl
      img.alt = profile.displayName || profile.username || 'Avatar'
      avatarEl.appendChild(img)
    } else {
      const text = profile.displayName || profile.username || '?'
      avatarEl.textContent = ''
      const span = document.createElement('span')
      span.className = 'initial'
      span.textContent = text.charAt(0).toUpperCase()
      avatarEl.appendChild(span)
    }
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
