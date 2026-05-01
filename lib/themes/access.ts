import { themeConfigs, type ThemeId } from './config'
import type { ThemeAccess } from '@/types/theme'

/**
 * Check if a theme is free (no premium required)
 */
export function isFreeTheme(themeId: ThemeId): boolean {
  const config = themeConfigs[themeId]
  return config ? !config.isPremium : false
}

/**
 * Check if a theme requires premium subscription
 */
export function isPremiumTheme(themeId: ThemeId): boolean {
  const config = themeConfigs[themeId]
  return config ? config.isPremium : true
}

/**
 * Get list of all free themes
 */
export function getFreeThemes(): ThemeId[] {
  return Object.entries(themeConfigs)
    .filter(([, config]) => !config.isPremium)
    .map(([id]) => id as ThemeId)
}

/**
 * Get list of all premium themes
 */
export function getPremiumThemes(): ThemeId[] {
  return Object.entries(themeConfigs)
    .filter(([, config]) => config.isPremium)
    .map(([id]) => id as ThemeId)
}

/**
 * Check if user has access to a specific theme
 */
export function checkThemeAccess(
  themeId: ThemeId,
  userPlan: 'free' | 'premium' | 'family' = 'free',
  purchasedThemes: ThemeId[] = []
): ThemeAccess {
  const config = themeConfigs[themeId]
  
  if (!config) {
    return {
      themeId,
      hasAccess: false,
      reason: 'free',
    }
  }

  // Free themes are always accessible
  if (!config.isPremium) {
    return {
      themeId,
      hasAccess: true,
      reason: 'free',
    }
  }

  // Check if user has premium/family plan
  if (userPlan === 'premium' || userPlan === 'family') {
    return {
      themeId,
      hasAccess: true,
      reason: 'premium',
    }
  }

  // Check if user purchased this specific theme
  if (purchasedThemes.includes(themeId)) {
    return {
      themeId,
      hasAccess: true,
      reason: 'purchased',
    }
  }

  // No access
  return {
    themeId,
    hasAccess: false,
    reason: 'premium',
  }
}

/**
 * Get all accessible themes for a user
 */
export function getAccessibleThemes(
  userPlan: 'free' | 'premium' | 'family' = 'free',
  purchasedThemes: ThemeId[] = []
): ThemeId[] {
  return Object.keys(themeConfigs).filter((id) => {
    const access = checkThemeAccess(id as ThemeId, userPlan, purchasedThemes)
    return access.hasAccess
  }) as ThemeId[]
}
