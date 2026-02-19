import { db, User, Link as LinkTable, eq } from 'astro:db'
import type { AstroGlobal } from 'astro'
import type { UserProfile } from '../types/linktree'
import { isReservedRoute } from './profile'

/**
 * Find a user by ID in Astro DB
 */
export async function findUserById(id: string): Promise<UserProfile | null> {
  try {
    const users = await db.select().from(User).where(eq(User.id, id)).limit(1)
    
    if (users.length === 0) return null
    
    const userData = users[0]
    const linksData = await db.select().from(LinkTable).where(eq(LinkTable.userId, userData.id))
    
    return {
      id: userData.id,
      username: userData.username,
      displayName: userData.displayName,
      bio: userData.bio || '',
      avatarUrl: userData.avatarUrl || '',
      theme: userData.theme as any,
      links: linksData.map(l => ({
        id: l.id,
        title: l.title,
        url: l.url,
        order: l.order,
        isActive: l.isActive,
        thumbnailType: l.thumbnailType as any,
        thumbnailUrl: l.thumbnailUrl || undefined
      }))
    }
  } catch (error) {
    console.error('Error finding user by ID in DB:', error)
    return null
  }
}

/**
 * Find a user by username in Astro DB
 */
export async function findUserByUsername(username: string): Promise<UserProfile | null> {
  try {
    const users = await db.select().from(User).where(eq(User.username, username)).limit(1)
    
    if (users.length === 0) return null
    
    const userData = users[0]
    const linksData = await db.select().from(LinkTable).where(eq(LinkTable.userId, userData.id))
    
    return {
      id: userData.id,
      username: userData.username,
      displayName: userData.displayName,
      bio: userData.bio || '',
      avatarUrl: userData.avatarUrl || '',
      theme: userData.theme as any,
      links: linksData.map(l => ({
        id: l.id,
        title: l.title,
        url: l.url,
        order: l.order,
        isActive: l.isActive,
        thumbnailType: l.thumbnailType as any,
        thumbnailUrl: l.thumbnailUrl || undefined
      }))
    }
  } catch (error) {
    console.error('Error finding user by username in DB:', error)
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
  
  if (isReservedRoute(username)) {
    return {
      profile: null,
      seoTitle: defaultTitle,
      seoDescription: defaultDescription
    }
  }

  try {
    const profile = await findUserByUsername(username)
    
    if (!profile) {
      return {
        profile: null,
        seoTitle: defaultTitle,
        seoDescription: defaultDescription
      }
    }
    
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
