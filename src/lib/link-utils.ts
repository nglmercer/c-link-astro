// ============================================
// Link Utilities
// ============================================

export interface PlatformIcon {
  icon: string
  color: string
}

// Platform icon mappings
export const platformIcons: Record<string, PlatformIcon> = {
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

export const defaultPlatformIcon: PlatformIcon = { icon: 'link', color: '#6b7280' }

/**
 * Get domain from URL without www
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * Get favicon URL for a domain
 */
export function getFaviconUrl(url: string): string {
  try {
    const domain = getDomain(url)
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch {
    return ''
  }
}

/**
 * Get platform icon for a URL
 */
export function getPlatformIcon(url: string): PlatformIcon {
  try {
    const domain = getDomain(url).toLowerCase()
    
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
 * Get platform icon name only
 */
export function getPlatformIconName(url: string): string {
  return getPlatformIcon(url).icon
}

/**
 * Validate if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}
