import type { APIRoute } from 'astro'
import { db, User, Link, eq } from 'astro:db'
import type { UserProfile } from '../../../types/linktree'

export const GET: APIRoute = async (context) => {
  const { username } = context.params

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // 1. Fetch user from DB
    const users = await db.select().from(User).where(eq(User.username, username)).limit(1)

    if (users.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const userData = users[0]

    // 2. Fetch links for the user
    const linksData = await db.select().from(Link).where(eq(Link.userId, userData.id))

    const profile: UserProfile = {
      id: userData.id,
      username: userData.username,
      displayName: userData.displayName,
      bio: userData.bio || '',
      theme: userData.theme as any,
      links: linksData.map(l => ({
        id: l.id,
        title: l.title,
        url: l.url,
        order: l.order,
        isActive: l.isActive
      }))
    }

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching profile from DB:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
