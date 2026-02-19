import type { APIRoute } from 'astro'
import { clerkClient } from '@clerk/astro/server'

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
    const clerk = clerkClient(context)
    const auth = context.locals.auth()
    const currentUserId = auth?.userId

    // Get all users and check
    const usersResponse = await clerk.users.getUserList({ limit: 100 })
    const usersArray = Array.isArray(usersResponse) 
      ? usersResponse 
      : (usersResponse.data || [])

    // Find if username is taken
    const userWithUsername = usersArray.find((user: any) => {
      if (currentUserId && user.id === currentUserId) return false
      const metadata = user.publicMetadata as Record<string, any>
      return metadata?.profile?.username?.toLowerCase() === username.toLowerCase()
    })

    if (userWithUsername) {
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
    console.error('Error checking username:', error)
    return new Response(JSON.stringify({ error: 'Failed to check username' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
