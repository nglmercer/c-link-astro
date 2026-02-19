import type { APIRoute } from 'astro'
import { db, User, eq, and, ne } from 'astro:db'

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url)
  const username = url.searchParams.get('username')

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Validate username format
  if (username.length < 3 || username.length > 30) {
    return new Response(JSON.stringify({ available: false, reason: 'Username must be 3-30 characters' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return new Response(JSON.stringify({ available: false, reason: 'Username can only contain letters, numbers, underscores, and hyphens' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const auth = context.locals.auth()
    const currentUserId = auth?.userId

    // Check if username exists in DB
    // If currentUserId exists, we exclude the current user from the check
    const existingUser = await db.select()
      .from(User)
      .where(
        currentUserId 
          ? and(eq(User.username, username), ne(User.id, currentUserId))
          : eq(User.username, username)
      )
      .limit(1)

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ available: false, reason: 'Username is already taken' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ available: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error checking username in DB:', error)
    return new Response(JSON.stringify({ error: 'Failed to check username' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
