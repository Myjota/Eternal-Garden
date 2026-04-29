export interface Memorial {
  id: string
  slug: string
  firstName: string
  lastName: string
  birthDate: string
  deathDate: string
  biography: string
  profileImage: string
  coverImage?: string
  theme: string
  isPublic: boolean
  candlesLit: number
  visitors: number
  createdAt: string
  userId: string
}

export interface TimelineEvent {
  id: string
  memorialId: string
  title: string
  description: string
  date: string
  imageUrl?: string
  order: number
}

export interface GalleryItem {
  id: string
  memorialId: string
  imageUrl: string
  caption?: string
  order: number
}

export interface Condolence {
  id: string
  memorialId: string
  authorName: string
  message: string
  createdAt: string
}

// Famous Lithuanians for the landing page carousel
export const famousLithuanians: Memorial[] = [
  {
    id: '1',
    slug: 'mikalojus-konstantinas-ciurlionis',
    firstName: 'Mikalojus Konstantinas',
    lastName: 'Čiurlionis',
    birthDate: '1875-09-22',
    deathDate: '1911-04-10',
    biography: 'Lietuvių kompozitorius ir dailininkas, reikšminga modernizmo asmenybė.',
    profileImage: '/images/ciurlionis.webp',
    theme: 'garden',
    isPublic: true,
    candlesLit: 1247,
    visitors: 15832,
    createdAt: '2024-01-01',
    userId: 'system',
  },
  {
    id: '2',
    slug: 'salomeja-neris',
    firstName: 'Salomėja',
    lastName: 'Nėris',
    birthDate: '1904-11-17',
    deathDate: '1945-07-07',
    biography: 'Lietuvių poetė, viena iškiliausių XX a. Lietuvos literatūros kūrėjų.',
    profileImage: '/images/neris.webp',
    theme: 'garden',
    isPublic: true,
    candlesLit: 892,
    visitors: 12456,
    createdAt: '2024-01-01',
    userId: 'system',
  },
  {
    id: '3',
    slug: 'jonas-basanavicius',
    firstName: 'Jonas',
    lastName: 'Basanavičius',
    birthDate: '1851-11-23',
    deathDate: '1927-02-16',
    biography: 'Lietuvos tautinio atgimimo veikėjas, publicistas, "Aušros" redaktorius.',
    profileImage: '/images/basanavicius.webp',
    theme: 'garden',
    isPublic: true,
    candlesLit: 2341,
    visitors: 28934,
    createdAt: '2024-01-01',
    userId: 'system',
  },
  {
    id: '4',
    slug: 'kazys-grinius',
    firstName: 'Kazys',
    lastName: 'Grinius',
    birthDate: '1866-12-17',
    deathDate: '1950-06-04',
    biography: 'Lietuvos diplomatas ir politikas, signataras.',
    profileImage: '/images/grinius.webp',
    theme: 'garden',
    isPublic: true,
    candlesLit: 567,
    visitors: 8923,
    createdAt: '2024-01-01',
    userId: 'system',
  },
]

// Sample user for demo
export const sampleUser = {
  id: 'demo-user',
  email: 'demo@eternalgarden.lt',
  firstName: 'Jonas',
  lastName: 'Jonaitis',
}
