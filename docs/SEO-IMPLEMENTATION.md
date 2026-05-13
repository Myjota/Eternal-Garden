# Eternal Garden - SEO Implementation Guide

## Overview

This document outlines the complete SEO setup for the Eternal Garden project. All configurations are designed to improve search engine visibility, user engagement, and organic traffic.

## Files and Configuration

### 1. Root Layout Metadata (`app/layout.tsx`)

The main metadata configuration includes:
- **Title & Description**: Default site title and meta description
- **Keywords**: Comprehensive list of Lithuanian and English keywords
- **Authors**: Metadata about content creators
- **Verification**: Google Search Console verification
- **OpenGraph Tags**: For social media sharing
- **Twitter Cards**: Optimized for Twitter/X
- **Robots Rules**: Crawl guidelines for search engines

**Key Settings:**
```typescript
- metadataBase: https://eternalgarden.eu
- locale: lt_LT (Lithuanian)
- alternateLocale: en_US (English)
- Google Verification: bSkiHT-YJWJl9Dm5J3A5omcwFLdlIAvZyuj3bT8MfTw
```

### 2. Page-Level Metadata

Each page has been configured with custom metadata:

| Page | File | Focus |
|------|------|-------|
| Homepage | `app/page.tsx` | Main site entry point |
| About | `app/about/page.tsx` | Company mission and values |
| Services | `app/services/page.tsx` | Available packages |
| FAQ | `app/faq/page.tsx` | User questions and answers |
| Privacy | `app/privacy/page.tsx` | Data protection policy |
| Terms | `app/terms/page.tsx` | Legal terms and conditions |
| Support | `app/support/page.tsx` | Customer support info |
| Memorials | `app/memorial/[slug]/page.tsx` | Dynamic memorial pages (profile type) |

### 3. Dynamic Metadata for Memorials

The memorial page (`app/memorial/[slug]/page.tsx`) uses `generateMetadata()` function to:
- Extract memorial data from database
- Generate personalized title: `FirstName LastName (BirthYear - DeathYear)`
- Use memorial bio as description
- Include profile image as OpenGraph image
- Set schema type to 'profile' for rich snippets

### 4. Robots Configuration (`public/robots.txt`)

**Allow:**
- All pages for public indexing
- `/sitemap.xml` for discovery

**Disallow:**
- `/admin` - Admin panel
- `/dashboard` - User dashboard
- `/profile` - User profiles
- `/settings` - User settings
- `/auth` - Authentication pages
- `/create` - Memorial creation form
- `/api` - API endpoints (except sitemap)

**Other:**
- Crawl-delay: 1 second
- Blocks bad bots (MJ12bot, AhrefsBot)

### 5. Sitemap (`app/sitemap.ts`)

Configuration includes:
- **Static URLs**: Home, About, FAQ, Services, Support
- **Dynamic URLs**: All public memorials from database
- **Update Frequency**: Daily (home), Monthly (pages), per memorial updated_at
- **Priority Levels**: 1.0 (home), 0.8 (pages), 0.7 (memorials)
- **Max URLs**: 5000 memorials

### 6. SEO Configuration Files

#### `lib/seo/config.ts`
Centralized SEO settings:
- Site URL and name constants
- Default metadata
- Keywords list
- Social media links
- Verification tokens
- Helper functions for generating standard metadata

#### `lib/seo/schema.ts`
JSON-LD structured data generators:
- Organization schema
- Website schema
- Memorial (Person) schema
- Breadcrumb schema
- Article schema
- Local business schema

## SEO Keywords

### Primary Keywords (Lithuanian)
- atminimas, memorialas, elektroninis memorialas
- sėpulkos, maldos, skaitmeninė atmintis
- šeima, giminės, atmintis
- gyvenimo istorija, nekrologas

### Secondary Keywords (English)
- memory, memorial, digital memorial
- condolences, family history, obituary

### Branded Keywords
- eternal garden, amžiną atminimą

## OpenGraph Configuration

### Image Specifications
- **Standard**: 1200x630px (for most platforms)
- **Square**: 800x800px (for profile pages)
- **Location**: `/public/og-image.png`, `/public/og-image-square.png`
- **Format**: PNG for best compatibility
- **File Size**: Keep under 5MB for optimal social sharing

### Required Images
You need to create and place:
1. `/public/og-image.png` - Standard OpenGraph image
2. `/public/og-image-square.png` - Square profile image
3. `/public/logo.png` - Site logo

### Social Media Preview
- **Facebook**: Uses 1200x630 image with title and description
- **Twitter/X**: Uses 1200x630 with custom card settings
- **LinkedIn**: Uses profile card format

## Implementation Checklist

### Immediate Actions
- [x] Add root metadata with keywords and OpenGraph
- [x] Add page-specific metadata to all public pages
- [x] Create `robots.txt` file
- [x] Implement dynamic metadata for memorial pages
- [x] Create SEO configuration files
- [x] Add schema markup utilities

### To-Do
- [ ] **Create OG Images**: Design and place OpenGraph images
  - 1200x630px for standard sharing
  - 800x800px for profile cards
- [ ] **Add Logo**: Create and place logo at `/public/logo.png`
- [ ] **Verify Domain**: 
  - Submit sitemap to Google Search Console
  - Verify domain ownership
  - Submit to Bing Webmaster Tools
- [ ] **Create Schema Markup Components**: 
  - Add JSON-LD scripts to pages
  - Implement breadcrumb navigation
  - Add FAQ schema markup
- [ ] **Monitor Performance**:
  - Use Google Analytics
  - Track rankings in Google Search Console
  - Monitor Core Web Vitals
- [ ] **Test SEO**:
  - Use SEO audit tools (Lighthouse, SEMrush, Ahrefs)
  - Test OpenGraph sharing on social media
  - Validate structured data with Schema.org validator

## Best Practices

### 1. Meta Description
- Length: 155-160 characters
- Include primary keyword
- Write compelling call-to-action
- Make it unique for each page

### 2. Title Tags
- Length: 50-60 characters
- Include primary keyword
- Put important keywords first
- Include brand name

### 3. Keywords
- 3-5 primary keywords per page
- Mix of long-tail and short-tail
- Include both Lithuanian and English
- Avoid keyword stuffing

### 4. Content Structure
- Use H1 for page title (one per page)
- Use H2-H6 for sections
- Include keywords naturally in headings
- Use semantic HTML

### 5. Internal Linking
- Link related memorial pages
- Use descriptive anchor text
- Link to main category pages
- Create topic clusters

### 6. Image Optimization
- Use descriptive alt text
- Optimize file size (WebP format)
- Use descriptive filenames
- Maintain aspect ratios

## Monitoring and Maintenance

### Monthly Tasks
1. Check Google Search Console for errors
2. Review keyword rankings
3. Monitor click-through rates
4. Check internal links for 404s

### Quarterly Tasks
1. Audit metadata consistency
2. Update keywords based on trends
3. Review OpenGraph images
4. Update content for freshness

### Annual Tasks
1. Full SEO audit
2. Update keyword strategy
3. Review technical SEO
4. Plan content calendar

## Tools and Resources

### Free Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org Validator](https://validator.schema.org)
- [Meta Tags Generator](https://metatags.io)

### Paid Tools
- Ahrefs
- SEMrush
- Moz Pro
- Screaming Frog SEO Spider

## Troubleshooting

### Issue: Pages not indexing
**Solution:**
1. Check robots.txt allows indexing
2. Submit sitemap to Google Search Console
3. Verify domain ownership
4. Check for noindex meta tags

### Issue: Poor search rankings
**Solution:**
1. Check keyword relevance
2. Improve content quality
3. Build quality backlinks
4. Optimize Core Web Vitals

### Issue: OpenGraph images not showing
**Solution:**
1. Verify image path is correct
2. Check image dimensions (1200x630)
3. Ensure image file size is under 5MB
4. Test with Social Media Debuggers

## Future Enhancements

1. **Hreflang Tags**: Add language-specific routes for en/lt
2. **Structured Data**: Implement more schema markup types
3. **Rich Snippets**: Add FAQPage schema for FAQ
4. **International SEO**: Create multilingual sitemap
5. **Performance**: Implement image lazy loading
6. **Voice Search**: Optimize for conversational queries

## Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Moz SEO Beginner's Guide](https://moz.com/beginners-guide-to-seo)
- [Schema.org Documentation](https://schema.org)

---

**Last Updated**: May 2026
**Maintained By**: Eternal Garden Development Team
