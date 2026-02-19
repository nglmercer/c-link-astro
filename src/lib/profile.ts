// ============================================
// Profile Module - Main Entry Point
// Re-exports all profile-related utilities
// ============================================

// Re-export types
export type { UserProfile, Link, ThemeName, LinkInput, ProfileInput } from '../types/linktree'

// Re-export theme utilities
export { 
  themes, 
  DEFAULT_THEME, 
  getTheme, 
  getThemeNames,
  type Theme, 
  type ThemeConfig 
} from './theme'

// Re-export link utilities
export { 
  platformIcons, 
  defaultPlatformIcon,
  getDomain, 
  getFaviconUrl, 
  getPlatformIcon, 
  getPlatformIconName, 
  isValidUrl,
  type PlatformIcon 
} from './link-utils'

// Re-export format utilities
export { 
  formatDisplayName, 
  formatLinkCount, 
  getInitials, 
  truncate, 
  buildProfileDescription,
  RESERVED_ROUTES,
  isReservedRoute 
} from './format-utils'

// Re-export UI utilities (client-side only)
export { 
  applyTheme, 
  displayLinks, 
  updateProfileDisplay,
  showNotFoundState, 
  showLoadingState, 
  displayProfile 
} from './ui-utils'
