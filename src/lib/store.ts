// ============================================
// Client-side State Store
// Uses CustomEvents to communicate between components
// ============================================

import type { UserProfile, Link, ThemeName } from '../types/linktree'

export interface AppState {
  profile: UserProfile | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
}

// Store events
export const STORE_EVENTS = {
  STATE_CHANGED: 'store:stateChanged',
  PROFILE_UPDATED: 'store:profileUpdated',
  LINKS_UPDATED: 'store:linksUpdated',
  SAVING_STARTED: 'store:savingStarted',
  SAVING_COMPLETED: 'store:savingCompleted',
  SAVING_ERROR: 'store:savingError',
} as const

// Initial state
const initialState: AppState = {
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,
}

// Current state
let state: AppState = { ...initialState }

// Event target for dispatching events
const eventTarget = new EventTarget()

// Get current state
export function getState(): AppState {
  return { ...state }
}

// Update state
function setState(partial: Partial<AppState>): void {
  state = { ...state, ...partial }
  eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.STATE_CHANGED, { 
    detail: state 
  }))
}

// Profile actions
export function setProfile(profile: UserProfile | null): void {
  setState({ profile, error: null })
}

export function updateProfile(updates: Partial<UserProfile>): void {
  if (state.profile) {
    const updated = { ...state.profile, ...updates }
    setState({ profile: updated })
    eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.PROFILE_UPDATED, { 
      detail: updated 
    }))
  }
}

export function updateLinks(links: Link[]): void {
  if (state.profile) {
    const updated = { ...state.profile, links }
    setState({ profile: updated })
    eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.LINKS_UPDATED, { 
      detail: links 
    }))
  }
}

// Loading states
export function setLoading(isLoading: boolean): void {
  setState({ isLoading })
}

export function setSaving(isSaving: boolean): void {
  setState({ isSaving })
  if (isSaving) {
    eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.SAVING_STARTED))
  } else {
    eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.SAVING_COMPLETED))
  }
}

export function setError(error: string | null): void {
  setState({ error })
  if (error) {
    eventTarget.dispatchEvent(new CustomEvent(STORE_EVENTS.SAVING_ERROR, { 
      detail: error 
    }))
  }
}

// Subscribe to state changes
export function subscribe(callback: (state: AppState) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<AppState>
    callback(customEvent.detail)
  }
  
  eventTarget.addEventListener(STORE_EVENTS.STATE_CHANGED, handler)
  
  // Return unsubscribe function
  return () => {
    eventTarget.removeEventListener(STORE_EVENTS.STATE_CHANGED, handler)
  }
}

// Subscribe to profile updates
export function onProfileUpdated(callback: (profile: UserProfile) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<UserProfile>
    callback(customEvent.detail)
  }
  
  eventTarget.addEventListener(STORE_EVENTS.PROFILE_UPDATED, handler)
  
  return () => {
    eventTarget.removeEventListener(STORE_EVENTS.PROFILE_UPDATED, handler)
  }
}

// Subscribe to links updates
export function onLinksUpdated(callback: (links: Link[]) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<Link[]>
    callback(customEvent.detail)
  }
  
  eventTarget.addEventListener(STORE_EVENTS.LINKS_UPDATED, handler)
  
  return () => {
    eventTarget.removeEventListener(STORE_EVENTS.LINKS_UPDATED, handler)
  }
}

// Subscribe to saving events
export function onSavingStarted(callback: () => void): () => void {
  const handler = () => callback()
  eventTarget.addEventListener(STORE_EVENTS.SAVING_STARTED, handler)
  return () => eventTarget.removeEventListener(STORE_EVENTS.SAVING_STARTED, handler)
}

export function onSavingCompleted(callback: () => void): () => void {
  const handler = () => callback()
  eventTarget.addEventListener(STORE_EVENTS.SAVING_COMPLETED, handler)
  return () => eventTarget.removeEventListener(STORE_EVENTS.SAVING_COMPLETED, handler)
}

export function onSavingError(callback: (error: string) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<string>
    callback(customEvent.detail)
  }
  eventTarget.addEventListener(STORE_EVENTS.SAVING_ERROR, handler)
  return () => eventTarget.removeEventListener(STORE_EVENTS.SAVING_ERROR, handler)
}

// API functions
export async function loadProfile(username: string): Promise<UserProfile | null> {
  setLoading(true)
  setError(null)
  
  try {
    const response = await fetch(`/api/profile/${username}`)
    
    if (!response.ok) {
      throw new Error('Profile not found')
    }
    
    const data = await response.json()
    
    if (!data.profile) {
      throw new Error('Profile not found')
    }
    
    setProfile(data.profile)
    return data.profile
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load profile'
    setError(errorMessage)
    return null
  } finally {
    setLoading(false)
  }
}

export async function saveProfile(data: {
  username?: string
  displayName?: string
  bio?: string
  avatarUrl?: string
  theme?: ThemeName
  links?: Link[]
}): Promise<UserProfile | null> {
  setSaving(true)
  setError(null)
  
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to save profile')
    }
    
    const result = await response.json()
    
    if (result.success) {
      setProfile(result.profile)
      return result.profile
    } else {
      throw new Error(result.error || 'Failed to save profile')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to save profile'
    setError(errorMessage)
    return null
  } finally {
    setSaving(false)
  }
}

export async function checkUsername(username: string): Promise<{ available: boolean; reason?: string }> {
  try {
    const response = await fetch(`/api/profile/check?username=${encodeURIComponent(username)}`)
    return await response.json()
  } catch {
    return { available: false, reason: 'Failed to check username' }
  }
}

// Reset state
export function resetState(): void {
  state = { ...initialState }
  setState(initialState)
}
