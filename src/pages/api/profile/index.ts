import type { APIRoute } from 'astro'
import { db, User, Link, eq } from 'astro:db'
import type { UserProfile, Link as LinkType } from '../../../types/linktree'

export const POST: APIRoute = async (context) => {
  const auth = context.locals.auth()
  
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await context.request.json()
    const { username, displayName, bio, links, theme } = body

    // 1. Upsert the User profile
    await db.insert(User).values({
      id: auth.userId,
      username: username || auth.userId.slice(0, 12),
      displayName: displayName || 'User',
      bio: bio || '',
      theme: theme || 'gradient',
      updatedAt: new Date()
    }).onConflictDoUpdate({
      target: User.id,
      set: {
        username: username || auth.userId.slice(0, 12),
        displayName: displayName || 'User',
        bio: bio || '',
        theme: theme || 'gradient',
        updatedAt: new Date()
      }
    })

    // 2. Handle Links
    // For simplicity, we delete and re-insert links for this user
    if (links && Array.isArray(links)) {
      await db.delete(Link).where(eq(Link.userId, auth.userId))
      
      if (links.length > 0) {
        const linksToInsert = links.map((link: LinkType, index: number) => ({
          id: link.id || crypto.randomUUID(),
          userId: auth.userId,
          title: link.title,
          url: link.url,
          order: index,
          isActive: link.isActive !== undefined ? link.isActive : true
        }))
        
        await db.insert(Link).values(linksToInsert)
      }
    }

    const profileData: UserProfile = {
      id: auth.userId,
      username: username || auth.userId.slice(0, 12),
      displayName: displayName || 'User',
      bio: bio || '',
      theme: (theme as any) || 'gradient',
      links: links || []
    }

    return new Response(JSON.stringify({ success: true, profile: profileData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error saving profile to DB:', error)
    return new Response(JSON.stringify({ error: 'Failed to save profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
