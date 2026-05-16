# Eternal Garden - Projekto Dokumentacija

Skaitmeninis atminties sodas - platforma, skirta išsaugoti artimųjų gyvenimo istorijas ir prisiminimus ateities kartoms.

**Svetainė:** https://eternalgarden.eu

---

## Turinys

1. [Apžvalga](#apžvalga)
2. [Technologijos](#technologijos)
3. [Projekto struktūra](#projekto-struktūra)
4. [Duomenų bazė](#duomenų-bazė)
5. [Puslapiai ir funkcionalumas](#puslapiai-ir-funkcionalumas)
6. [Temos](#temos)
7. [Daugiakalbystė](#daugiakalbystė)
8. [API maršrutai](#api-maršrutai)
9. [Komponentai](#komponentai)
10. [Paleidimas](#paleidimas)

---

## Apžvalga

Eternal Garden yra moderni web aplikacija, leidžianti vartotojams:
- Kurti skaitmeninius memorialus mirusiems artimiesiems
- Pridėti gyvenimo įvykių laiko juostą (timeline)
- Įkelti nuotraukas į galeriją
- Nurodyti kapavietės informaciją
- Uždegti virtualias žvakes
- Palikti užuojautos žinutes
- Dalintis memorialais su šeima ir draugais

---

## Technologijos

| Technologija | Versija | Paskirtis |
|-------------|---------|-----------|
| Next.js | 16.2.4 | React framework su App Router |
| React | 19.2.4 | UI biblioteka |
| TypeScript | 5.7.3 | Tipizuota JavaScript |
| Tailwind CSS | 4.2.0 | CSS framework |
| Supabase | 2.105.1 | Backend-as-a-Service (Auth + DB) |
| shadcn/ui | - | UI komponentų biblioteka |
| Radix UI | - | Accessibility-first primityvai |
| SWR | 2.4.1 | Duomenų fetching ir caching |
| Zod | 3.24.1 | Schema validacija |
| React Hook Form | 7.54.1 | Formų valdymas |
| date-fns | 4.1.0 | Datų formatavimas |
| Lucide React | 0.564.0 | Ikonos |
| Recharts | 2.15.0 | Grafikai |
| simplex-noise | 4.0.3 | Animuoti fonai |

---

## Projekto struktūra

```
eternal-garden/
├── app/                          # Next.js App Router puslapiai
│   ├── about/                    # Apie mus puslapis
│   │   ├── page.tsx
│   │   └── about-client.tsx
│   ├── admin/                    # Admin panelė
│   ├── api/                      # API maršrutai
│   │   ├── candles/             # Žvakių API
│   │   ├── condolences/         # Užuojautų API
│   │   ├── famous-memorials/    # Žymių žmonių API
│   │   ├── my-ip/               # IP gavimas
│   │   └── search-memorials/    # Paieška
│   ├── auth/                     # Autentifikacija
│   │   ├── callback/            # OAuth callback
│   │   ├── error/               # Klaidų puslapis
│   │   ├── forgot-password/     # Slaptažodžio atkūrimas
│   │   ├── login/               # Prisijungimas
│   │   ├── logout/              # Atsijungimas
│   │   ├── reset-password/      # Slaptažodžio keitimas
│   │   ├── signup/              # Registracija
│   │   └── signup-success/      # Registracijos patvirtinimas
│   ├── create/                   # Memorialo kūrimas
│   │   ├── page.tsx             # Pagrindinis kūrimo puslapis
│   │   └── steps/               # Kūrimo žingsniai
│   │       ├── step-information.tsx  # 1. Informacija
│   │       ├── step-timeline.tsx     # 2. Gyvenimas
│   │       ├── step-burial.tsx       # 3. Kapavietė
│   │       ├── step-theme.tsx        # 4. Tema
│   │       ├── step-review.tsx       # 5. Peržiūra
│   │       └── index.ts
│   ├── dashboard/                # Vartotojo valdymo skydelis
│   │   ├── page.tsx
│   │   ├── dashboard-client.tsx
│   │   └── memorial/[id]/edit/  # Memorialo redagavimas
│   ├── faq/                      # D.U.K.
│   ├── kontaktai/                # Kontaktai
│   ├── memorial/[slug]/          # Memorialo peržiūra
│   │   ├── page.tsx
│   │   └── memorial-client.tsx
│   ├── privacy/                  # Privatumo politika
│   ├── profile/                  # Vartotojo profilis
│   ├── services/                 # Paslaugos
│   ├── settings/                 # Nustatymai
│   ├── support/                  # Parama projektui
│   ├── terms/                    # Pirkimo taisyklės
│   ├── layout.tsx                # Pagrindinis layout
│   ├── page.tsx                  # Pagrindinis puslapis (Home)
│   ├── robots.ts                 # robots.txt generavimas
│   └── sitemap.ts                # sitemap.xml generavimas
│
├── components/                   # React komponentai
│   ├── candle/                   # Žvakių komponentai
│   │   ├── Candle.tsx           # Deganti žvakė
│   │   ├── CandleSection.tsx    # Žvakių sekcija
│   │   └── CandleUnlit.tsx      # Nedeganti žvakė
│   ├── icons.tsx                 # Custom ikonos
│   ├── landing/                  # Landing page sekcijos
│   │   ├── famous-section.tsx   # Žymūs žmonės
│   │   ├── features-section.tsx # Funkcijos
│   │   ├── hero-section.tsx     # Hero sekcija
│   │   └── vision-section.tsx   # Vizija
│   ├── layout/                   # Layout komponentai
│   │   ├── footer.tsx           # Footer
│   │   └── header.tsx           # Header su navigacija
│   ├── memorial/                 # Memorialo komponentai
│   │   ├── BurialPlace.tsx      # Kapavietės info
│   │   ├── MemorialBiography.tsx # Biografija
│   │   ├── MemorialGallery.tsx  # Nuotraukų galerija
│   │   ├── MemorialHero.tsx     # Hero sekcija
│   │   ├── MemorialTabs.tsx     # Tabs navigacija
│   │   └── tabs/
│   │       ├── CondolencesTab.tsx # Užuojautos
│   │       └── TimelineTab.tsx    # Gyvenimo įvykiai
│   ├── search/                   # Paieškos komponentai
│   │   └── memorial-search.tsx
│   ├── support-box.tsx           # Paramos dėžutė
│   ├── theme-picker.tsx          # Temų pasirinkimas
│   ├── theme-provider.tsx        # Temos provider
│   ├── theme/
│   │   └── ThemePreviewCard.tsx # Temos peržiūra
│   └── ui/                       # shadcn/ui komponentai
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       ├── toast.tsx
│       └── ... (50+ komponentų)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   ├── use-toast.ts             # Toast pranešimai
│   ├── useCandlesData.ts        # Žvakių duomenys
│   └── useCondolences.ts        # Užuojautų duomenys
│
├── lib/                          # Pagalbinės bibliotekos
│   ├── i18n/                     # Daugiakalbystė
│   │   ├── config.ts            # Konfigūracija
│   │   ├── index.ts             # Exports
│   │   ├── useLocale.ts         # Hook
│   │   └── locales/
│   │       ├── lt.ts            # Lietuvių
│   │       ├── en.ts            # Anglų
│   │       └── ru.ts            # Rusų
│   ├── nav/
│   │   └── nav.config.ts        # Navigacijos konfigūracija
│   ├── seo/
│   │   ├── config.ts            # SEO konfigūracija
│   │   └── schema.ts            # JSON-LD schema
│   ├── supabase/                 # Supabase integracija
│   │   ├── candles.ts           # Žvakių funkcijos
│   │   ├── client.ts            # Browser client
│   │   ├── middleware.ts        # Auth middleware
│   │   └── server.ts            # Server client
│   ├── themes/                   # Temų sistema
│   │   ├── access.ts            # Temų prieiga
│   │   ├── config.ts            # Temų sąrašas
│   │   ├── index.ts             # Exports
│   │   └── theme-context.tsx    # Theme context
│   └── utils.ts                  # Utility funkcijos (cn)
│
├── providers/                    # React Context Providers
│   └── locale-provider.tsx      # Kalbos provider
│
├── middleware.ts                 # Next.js middleware (auth)
├── next.config.ts                # Next.js konfigūracija
├── package.json                  # Priklausomybės
├── tailwind.config.ts            # Tailwind konfigūracija
└── tsconfig.json                 # TypeScript konfigūracija
```

---

## Duomenų bazė

### Supabase PostgreSQL Schema

#### `profiles` - Vartotojų profiliai
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas (FK į auth.users) |
| email | text | El. pašto adresas |
| first_name | text | Vardas |
| last_name | text | Pavardė |
| avatar_url | text | Avataro nuotrauka |
| preferred_language | text | Pasirinkta kalba (lt/en/ru) |
| is_admin | boolean | Ar administratorius |
| created_at | timestamp | Sukūrimo data |
| updated_at | timestamp | Atnaujinimo data |

#### `memorials` - Memorialai
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| user_id | uuid | Savininko ID |
| slug | text | URL slug (unikalus) |
| name | text | Pilnas vardas |
| first_name | text | Vardas |
| last_name | text | Pavardė |
| birth_date | date | Gimimo data |
| death_date | date | Mirties data |
| birth_place | text | Gimimo vieta |
| biography | text | Biografija |
| epitaph | text | Epitafija |
| photo_url | text | Pagrindinė nuotrauka |
| profile_image_url | text | Profilio nuotrauka |
| cover_image_url | text | Viršelio nuotrauka |
| theme | enum | Pasirinkta tema |
| privacy | enum | Privatumo nustatymas |
| is_public | boolean | Ar viešas |
| is_famous | boolean | Ar žymus žmogus |
| allow_candles | boolean | Ar leidžiamos žvakės |
| allow_condolences | boolean | Ar leidžiamos užuojautos |
| candle_count | integer | Žvakių skaičius |
| view_count | integer | Peržiūrų skaičius |
| burial_place_id | uuid | FK į burial_places |
| created_at | timestamp | Sukūrimo data |
| updated_at | timestamp | Atnaujinimo data |

#### `timeline_events` - Gyvenimo įvykiai
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| memorial_id | uuid | FK į memorials |
| title | text | Įvykio pavadinimas |
| description | text | Aprašymas |
| event_date | date | Įvykio data |
| location | text | Vieta |
| image_url | text | Nuotrauka |
| sort_order | integer | Rikiavimo tvarka |
| created_at | timestamp | Sukūrimo data |
| updated_at | timestamp | Atnaujinimo data |

#### `burial_places` - Kapavietės
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| name | text | Pavadinimas |
| cemetery_name | text | Kapinių pavadinimas |
| address | text | Adresas |
| city | text | Miestas |
| country | text | Šalis |
| section | text | Sekcija / Kvartalas |
| plot_number | text | Kapavietės numeris |
| latitude | numeric | GPS platuma |
| longitude | numeric | GPS ilguma |
| created_at | timestamp | Sukūrimo data |
| updated_at | timestamp | Atnaujinimo data |

#### `gallery_items` - Galerijos elementai
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| memorial_id | uuid | FK į memorials |
| type | enum | Tipas (image/video) |
| url | text | Failo URL |
| thumbnail_url | text | Miniatiūros URL |
| caption | text | Aprašymas |
| sort_order | integer | Rikiavimo tvarka |
| created_at | timestamp | Sukūrimo data |

#### `candles` - Žvakės
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| memorial_id | uuid | FK į memorials |
| user_id | uuid | Vartotojo ID (nullable) |
| user_name | text | Vartotojo vardas |
| is_lit | boolean | Ar dega |
| lit_at | timestamp | Uždegimo laikas |
| created_at | timestamp | Sukūrimo data |

#### `condolences` - Užuojautos
| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| id | uuid | Pirminis raktas |
| memorial_id | uuid | FK į memorials |
| user_id | uuid | Vartotojo ID (nullable) |
| author_name | text | Autoriaus vardas |
| message | text | Žinutė |
| is_approved | boolean | Ar patvirtinta |
| created_at | timestamp | Sukūrimo data |

### Row Level Security (RLS)

Visos lentelės turi įjungtą RLS su šiomis politikomis:
- **SELECT**: Vieši memorialai matomi visiems, privatūs - tik savininkui
- **INSERT**: Tik autentifikuoti vartotojai gali kurti
- **UPDATE**: Tik savininkas gali redaguoti
- **DELETE**: Tik savininkas gali trinti

---

## Puslapiai ir funkcionalumas

### Viešieji puslapiai

| Puslapis | URL | Aprašymas |
|----------|-----|-----------|
| Pagrindinis | `/` | Landing page su hero, funkcijomis, žymiais žmonėmis |
| Apie mus | `/about` | Informacija apie kūrėjus |
| Kontaktai | `/kontaktai` | Kontaktinė informacija |
| D.U.K. | `/faq` | Dažnai užduodami klausimai |
| Paslaugos | `/services` | Teikiamos paslaugos |
| Parama | `/support` | Paramos informacija |
| Memorialas | `/memorial/[slug]` | Memorialo peržiūra |
| Privatumo politika | `/privacy` | GDPR informacija |
| Pirkimo taisyklės | `/terms` | Teisinė informacija |

### Autentifikacijos puslapiai

| Puslapis | URL | Aprašymas |
|----------|-----|-----------|
| Prisijungimas | `/auth/login` | Email + slaptažodis arba OAuth |
| Registracija | `/auth/signup` | Naujo vartotojo registracija |
| Slaptažodžio atkūrimas | `/auth/forgot-password` | Reset email siuntimas |
| Slaptažodžio keitimas | `/auth/reset-password` | Naujo slaptažodžio nustatymas |
| Registracijos patvirtinimas | `/auth/signup-success` | Email patvirtinimo laukimas |

### Privatūs puslapiai (reikia autentifikacijos)

| Puslapis | URL | Aprašymas |
|----------|-----|-----------|
| Valdymo skydelis | `/dashboard` | Vartotojo memorialų sąrašas |
| Kurti memorialą | `/create` | 5 žingsnių kūrimo wizard |
| Redaguoti memorialą | `/dashboard/memorial/[id]/edit` | Memorialo redagavimas |
| Profilis | `/profile` | Vartotojo profilio valdymas |
| Nustatymai | `/settings` | Paskyros nustatymai |
| Admin | `/admin` | Administratoriaus panelė |

### Memorialo kūrimo žingsniai

1. **Informacija** - Vardas, pavardė, datos, biografija, epitafija, nuotrauka
2. **Gyvenimas** - Timeline įvykiai (gimimas, mokslai, vestuvės, kt.)
3. **Kapavietė** - Kapinių pavadinimas, adresas, sekcija, numeris
4. **Tema** - Vizualinio stiliaus pasirinkimas (6 temos)
5. **Peržiūra** - Galutinis patvirtinimas prieš išsaugant

---

## Temos

| Tema | ID | Aprašymas |
|------|-----|-----------|
| Sodas | `garden` | Žalia, rami, gamtos motyvai |
| Marmuras | `marble` | Klasikinis, elegantiškas |
| Ortodoksų | `orthodox` | Tradicinis, religinis |
| Amžinoji naktis | `eternal-night` | Tamsus, mistiškas |
| Vaivorykštės tiltas | `rainbow-bridge` | Šviesi, viltinga (augintiniams) |
| Saulėtas langas | `sunny-window` | Šilta, optimistinė |

Temos keičia:
- Spalvų paletę
- Fono stilių
- Šriftus
- Animacijas
- Ikonų stilių

---

## Daugiakalbystė

Palaikomos kalbos:
- **Lietuvių (lt)** - numatytoji
- **Anglų (en)**
- **Rusų (ru)**

### Naudojimas

```tsx
import { useLocaleContext } from '@/providers/locale-provider'
import { getTranslations } from '@/lib/i18n'

function MyComponent() {
  const { locale } = useLocaleContext()
  const t = getTranslations(locale)
  
  return <h1>{t.hero.title}</h1>
}
```

### Vertimų struktūra

Visi vertimai yra `lib/i18n/locales/` aplanke:
- `nav` - Navigacija
- `hero` - Hero sekcija
- `features` - Funkcijos
- `famousSection` - Žymūs žmonės
- `visionSection` - Vizija
- `aboutPage` - Apie mus
- `footer` - Footer
- `contactPage` - Kontaktai
- `supportPage` - Parama
- `auth` - Autentifikacija
- `memorial` - Memorialas
- `dashboard` - Valdymo skydelis
- `themes` - Temų pavadinimai
- `common` - Bendri tekstai

---

## API maršrutai

| Maršrutas | Metodas | Aprašymas |
|-----------|---------|-----------|
| `/api/candles` | GET, POST | Žvakių gavimas ir uždegimas |
| `/api/condolences` | GET, POST | Užuojautų gavimas ir rašymas |
| `/api/famous-memorials` | GET | Žymių žmonių memorialai |
| `/api/search-memorials` | GET | Memorialų paieška |
| `/api/my-ip` | GET | Vartotojo IP gavimas |
| `/auth/callback` | GET | OAuth callback |
| `/auth/logout` | POST | Atsijungimas |

---

## Komponentai

### Landing page
- `HeroSection` - Pagrindinis hero su paieška
- `FeaturesSection` - Funkcijų pristatymas
- `FamousSection` - Žymių žmonių karuselė
- `VisionSection` - Projekto vizija

### Memorial
- `MemorialHero` - Memorialo viršus su nuotrauka
- `MemorialBiography` - Biografijos sekcija
- `MemorialTabs` - Tab navigacija
- `TimelineTab` - Gyvenimo įvykiai
- `CondolencesTab` - Užuojautos
- `MemorialGallery` - Nuotraukų galerija
- `BurialPlace` - Kapavietės informacija
- `CandleSection` - Žvakių uždegimas

### Layout
- `Header` - Navigacija su kalbos ir temos perjungimu
- `Footer` - Informacija ir nuorodos

### UI (shadcn/ui)
50+ komponentų: Button, Card, Dialog, Input, Select, Tabs, Toast, ir kt.

---

## Paleidimas

### Reikalavimai
- Node.js 18+
- pnpm (rekomenduojama)

### Aplinkos kintamieji

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database (optional - for direct connection)
POSTGRES_URL=your_postgres_url
```

### Komandos

```bash
# Priklausomybių įdiegimas
pnpm install

# Developmento serveris
pnpm dev

# Production build
pnpm build

# Production serveris
pnpm start

# Linting
pnpm lint
```

### Deployment

Projektas yra sukonfigūruotas Vercel platformai:
- Automatinis deployment iš GitHub
- Edge functions palaikymas
- Supabase integracija per Vercel Integrations

---

## Kontaktai

- **Svetainė:** https://eternalgarden.eu
- **El. paštas:** info@eternalgarden.eu
- **Kūrėjai:** Olegas & Andrius

---

*Dokumentacija atnaujinta: 2026-05-16*
