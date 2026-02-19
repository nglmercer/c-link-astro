// ============================================
// Theme Configuration
// ============================================

import type { ThemeName } from '../types/linktree'

export interface Theme {
  name: string
  background: string
  cardBg: string
  cardBorder: string
  text: string
  subtext: string
  accent: string
  glass?: boolean
  buttonBg?: string
  buttonText?: string
}

export interface ThemeConfig {
  [key: string]: Theme
}

export const themes: ThemeConfig = {
  gradient: {
    name: 'Gradient Pulse',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    cardBorder: 'rgba(255, 255, 255, 0.2)',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.7)',
    accent: '#a78bfa',
    glass: true
  },
  ocean: {
    name: 'Deep Ocean',
    background: 'linear-gradient(180deg, #0c1929 0%, #1a365d 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    subtext: '#94a3b8',
    accent: '#38bdf8',
    glass: true
  },
  sunset: {
    name: 'Sunset Glass',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.8)',
    accent: '#f97316',
    glass: true
  },
  forest: {
    name: 'Emerald Mist',
    background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    cardBorder: 'rgba(255, 255, 255, 0.2)',
    text: '#ffffff',
    subtext: '#d1fae5',
    accent: '#6ee7b7',
    glass: true
  },
  dark: {
    name: 'Onyx',
    background: '#0f172a',
    cardBg: 'rgba(30, 41, 59, 0.5)',
    cardBorder: 'rgba(51, 65, 85, 0.5)',
    text: '#f8fafc',
    subtext: '#94a3b8',
    accent: '#38bdf8'
  },
  light: {
    name: 'Snowfall',
    background: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    text: '#0f172a',
    subtext: '#64748b',
    accent: '#2563eb'
  },
  cyberpunk: {
    name: 'Neon Night',
    background: '#020617',
    cardBg: 'rgba(15, 23, 42, 0.8)',
    cardBorder: '#f472b6',
    text: '#fdf2f8',
    subtext: '#f472b6',
    accent: '#f472b6'
  },
  midnight: {
    name: 'Midnight Bloom',
    background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    text: '#f8fafc',
    subtext: '#818cf8',
    accent: '#c084fc',
    glass: true
  },
  marshmallow: {
    name: 'Pastel Dream',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fef2f2 100%)',
    cardBg: '#ffffff',
    cardBorder: '#fbcfe8',
    text: '#831843',
    subtext: '#be185d',
    accent: '#db2777'
  },
  emerald: {
    name: 'Royal Emerald',
    background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    text: '#ecfdf5',
    subtext: '#a7f3d0',
    accent: '#34d399',
    glass: true
  }
}

// Default theme
export const DEFAULT_THEME: ThemeName = 'gradient'

/**
 * Get theme by name or custom JSON
 */
export function getTheme(themeName: ThemeName | string = DEFAULT_THEME): Theme {
  if (themeName && themeName.startsWith('{')) {
    try {
      const parsed = JSON.parse(themeName)
      if (parsed.custom) return parsed as Theme
    } catch(e) { /* fallback */ }
  }
  return themes[themeName as string] || themes[DEFAULT_THEME]
}

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[]
}
