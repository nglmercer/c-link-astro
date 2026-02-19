// ============================================
// Core Type Definitions
// ============================================

export interface Link {
  id: string
  title: string
  url: string
  icon?: string
  order: number
  isActive: boolean
  thumbnailType?: 'favicon' | 'preview' | 'custom' | 'platform'
  thumbnailUrl?: string
}

export type ThemeName = 
  | 'light' 
  | 'dark' 
  | 'gradient' 
  | 'ocean' 
  | 'sunset' 
  | 'forest' 
  | 'midnight' 
  | 'cyberpunk' 
  | 'marshmallow' 
  | 'emerald'

export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio?: string
  avatarUrl?: string
  theme: ThemeName
  links: Link[]
}

export interface LinkInput {
  title: string
  url: string
  icon?: string
  isActive?: boolean
}

export interface ProfileInput {
  displayName?: string
  bio?: string
  avatarUrl?: string
  theme?: ThemeName
}
