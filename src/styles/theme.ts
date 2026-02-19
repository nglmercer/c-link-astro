// ============================================
// Theme Manager Utility
// ============================================

import type { ThemeName } from '../types/linktree'

export interface ThemePreset {
  name: string
  background: string
  cardBg: string
  cardBorder: string
  text: string
  subtext: string
  accent: string
  glass?: boolean
}

export interface ThemePresets {
  [key: string]: ThemePreset
}

// Theme presets mapped to CSS custom properties
export const themePresets: ThemePresets = {
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
    accent: '#38bdf8',
    glass: false
  },
  light: {
    name: 'Snowfall',
    background: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    text: '#0f172a',
    subtext: '#64748b',
    accent: '#2563eb',
    glass: false
  },
  cyberpunk: {
    name: 'Neon Night',
    background: '#020617',
    cardBg: 'rgba(15, 23, 42, 0.8)',
    cardBorder: '#f472b6',
    text: '#fdf2f8',
    subtext: '#f472b6',
    accent: '#f472b6',
    glass: false
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
    accent: '#db2777',
    glass: false
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

export const DEFAULT_THEME: ThemeName = 'gradient'

/**
 * Get theme preset by name
 */
export function getThemePreset(themeName: ThemeName = DEFAULT_THEME): ThemePreset {
  return themePresets[themeName] || themePresets[DEFAULT_THEME]
}

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themePresets) as ThemeName[]
}

/**
 * Apply theme to a DOM element
 */
export function applyThemeToElement(
  element: HTMLElement,
  themeName: ThemeName
): void {
  const preset = getThemePreset(themeName)
  
  element.style.setProperty('--theme-bg', preset.background)
  element.style.setProperty('--theme-card-bg', preset.cardBg)
  element.style.setProperty('--theme-card-border', preset.cardBorder)
  element.style.setProperty('--theme-text', preset.text)
  element.style.setProperty('--theme-subtext', preset.subtext)
  element.style.setProperty('--theme-accent', preset.accent)
  element.style.setProperty('--theme-glass', preset.glass ? 'blur(16px)' : 'none')
  
  // Add data attribute for CSS selectors
  element.setAttribute('data-theme-preset', themeName)
}

/**
 * Apply theme using data attribute (preferred method)
 */
export function applyThemeAttribute(
  container: HTMLElement | Document,
  themeName: ThemeName
): void {
  container.setAttribute('data-theme-preset', themeName)
}

/**
 * Get CSS variables as inline styles for a theme
 */
export function getThemeInlineStyles(themeName: ThemeName): string {
  const preset = getThemePreset(themeName)
  const glassValue = preset.glass ? 'blur(16px)' : 'none'
  
  return `
    --theme-bg: ${preset.background};
    --theme-card-bg: ${preset.cardBg};
    --theme-card-border: ${preset.cardBorder};
    --theme-text: ${preset.text};
    --theme-subtext: ${preset.subtext};
    --theme-accent: ${preset.accent};
    --theme-glass: ${glassValue};
  `.trim()
}
