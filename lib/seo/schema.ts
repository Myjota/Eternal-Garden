/**
 * Structured Data (JSON-LD) generators for SEO
 * Used for schema.org markup to improve search engine understanding
 */

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eternal Garden',
    url: 'https://eternalgarden.eu',
    logo: 'https://eternalgarden.eu/logo.png',
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    sameAs: [
      'https://www.facebook.com/eternalgarden',
      'https://www.instagram.com/eternalgarden',
      'https://www.twitter.com/eternalgarden',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@eternalgarden.eu',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LT',
    },
  }
}

export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eternal Garden',
    url: 'https://eternalgarden.eu',
    description:
      'Skaitmeninė atminimo platforma. Sukurkite gražų atminimo puslapį savo mylimam žmogui.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://eternalgarden.eu/api/search-memorials?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export const generateMemorialSchema = (memorial: any) => {
  const firstName = memorial.first_name || ''
  const lastName = memorial.last_name || ''
  const birthDate = memorial.birth_date ? new Date(memorial.birth_date).toISOString() : null
  const deathDate = memorial.death_date ? new Date(memorial.death_date).toISOString() : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${firstName} ${lastName}`.trim(),
    image: memorial.profile_image_url || undefined,
    description: memorial.bio || `${firstName} ${lastName} atminimo puslapis`,
    birthDate: birthDate,
    deathDate: deathDate,
    url: `https://eternalgarden.eu/memorial/${encodeURIComponent(memorial.slug)}`,
  }
}

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const generateArticleSchema = (article: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization',
      name: 'Eternal Garden',
    },
  }
}

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Eternal Garden',
    image: 'https://eternalgarden.eu/logo.png',
    url: 'https://eternalgarden.eu',
    priceRange: '€€',
    description:
      'Skaitmeninė atminimo platforma. Sukurkite atminimo puslapius savo mylimam žmogui.',
    sameAs: ['https://www.facebook.com/eternalgarden', 'https://www.instagram.com/eternalgarden'],
  }
}
