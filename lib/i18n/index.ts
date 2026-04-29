import { lt, type Translations } from './locales/lt'
import { en } from './locales/en'
import { type Locale, defaultLocale } from './config'

const translations: Record<Locale, Translations> = {
  lt,
  en,
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale]
}

export function t(locale: Locale, key: string): string {
  const trans = getTranslations(locale)
  const keys = key.split('.')
  let result: unknown = trans
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  
  return typeof result === 'string' ? result : key
}

export * from './config'
export type { Translations }
