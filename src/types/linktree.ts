export interface Link {
  id: string
  title: string
  url: string
  icon?: string
  order: number
  isActive: boolean
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio?: string
  avatarUrl?: string
  theme: 'light' | 'dark' | 'gradient'
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
  theme?: 'light' | 'dark' | 'gradient'
}
