import type { Link, UserProfile, LinkInput, ProfileInput } from '../types/linktree'

// In-memory store - replace with database in production
const profiles: Map<string, UserProfile> = new Map()

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function getUserProfile(userId: string): UserProfile | undefined {
  return profiles.get(userId)
}

export function getUserProfileByUsername(username: string): UserProfile | undefined {
  for (const profile of profiles.values()) {
    if (profile.username === username) {
      return profile
    }
  }
  return undefined
}

export function createProfile(userId: string, username: string): UserProfile {
  const profile: UserProfile = {
    id: userId,
    username,
    displayName: username,
    bio: '',
    theme: 'gradient',
    links: [],
  }
  profiles.set(userId, profile)
  return profile
}

export function updateProfile(userId: string, input: ProfileInput): UserProfile | undefined {
  const profile = profiles.get(userId)
  if (!profile) return undefined

  if (input.displayName !== undefined) profile.displayName = input.displayName
  if (input.bio !== undefined) profile.bio = input.bio
  if (input.avatarUrl !== undefined) profile.avatarUrl = input.avatarUrl
  if (input.theme !== undefined) profile.theme = input.theme

  return profile
}

export function addLink(userId: string, input: LinkInput): Link | undefined {
  const profile = profiles.get(userId)
  if (!profile) return undefined

  const link: Link = {
    id: generateId(),
    title: input.title,
    url: input.url,
    icon: input.icon,
    order: profile.links.length,
    isActive: input.isActive ?? true,
  }
  profile.links.push(link)
  return link
}

export function updateLink(userId: string, linkId: string, input: Partial<LinkInput>): Link | undefined {
  const profile = profiles.get(userId)
  if (!profile) return undefined

  const link = profile.links.find((l) => l.id === linkId)
  if (!link) return undefined

  if (input.title !== undefined) link.title = input.title
  if (input.url !== undefined) link.url = input.url
  if (input.icon !== undefined) link.icon = input.icon
  if (input.isActive !== undefined) link.isActive = input.isActive

  return link
}

export function deleteLink(userId: string, linkId: string): boolean {
  const profile = profiles.get(userId)
  if (!profile) return false

  const index = profile.links.findIndex((l) => l.id === linkId)
  if (index === -1) return false

  profile.links.splice(index, 1)
  
  // Reorder remaining links
  profile.links.forEach((link, i) => {
    link.order = i
  })
  
  return true
}

export function reorderLinks(userId: string, linkIds: string[]): boolean {
  const profile = profiles.get(userId)
  if (!profile) return false

  const linkMap = new Map(profile.links.map((l) => [l.id, l]))
  
  linkIds.forEach((id, index) => {
    const link = linkMap.get(id)
    if (link) {
      link.order = index
    }
  })

  profile.links.sort((a, b) => a.order - b.order)
  return true
}
