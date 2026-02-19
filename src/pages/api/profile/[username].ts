import type { APIRoute } from 'astro'
import { clerkClient } from '@clerk/astro/server'
import type { UserProfile } from '../../../types/linktree'

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

    const clerk = clerkClient(context)
    
    // Get current user metadata
    const user = await clerk.users.getUser(auth.userId)
    const currentMetadata = user.publicMetadata as Record<string, any>
    
    // Update public metadata with profile data
    const profileData: UserProfile = {
      id: auth.userId,
      username: username || currentMetadata?.profile?.username || auth.userId.slice(0, 12),
      displayName: displayName || currentMetadata?.profile?.displayName || auth.userId.slice(0, 8),
      bio: bio || currentMetadata?.profile?.bio || '',
      theme: theme || currentMetadata?.profile?.theme || 'gradient',
      links: links || currentMetadata?.profile?.links || []
    }

    // Merge with existing metadata
    const newMetadata = {
      ...currentMetadata,
      profile: profileData
    }

    // Update user metadata
    await clerk.users.updateUser(auth.userId, {
      publicMetadata: newMetadata
    })

    return new Response(JSON.stringify({ success: true, profile: profileData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error saving profile:', error)
    return new Response(JSON.stringify({ error: 'Failed to save profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const GET: APIRoute = async (context) => {
  const { username } = context.params

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const clerk = clerkClient(context)
    
    // Get users list - Clerk returns { data: [...], totalCount: n }
    const usersResponse = await clerk.users.getUserList({ limit: 100 })
    
    // Handle both array and object response formats
    const usersArray = Array.isArray(usersResponse) 
      ? usersResponse 
      : (usersResponse.data || [])
    
    const userWithUsername = usersArray.find((user: any) => {
      const metadata = user.publicMetadata as Record<string, any>
      return metadata?.profile?.username === username
    })

    if (!userWithUsername) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const metadata = userWithUsername.publicMetadata as Record<string, any>
    const profile = metadata?.profile as UserProfile || {
      id: userWithUsername.id,
      username,
      displayName: username,
      bio: '',
      theme: 'gradient',
      links: []
    }

    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
