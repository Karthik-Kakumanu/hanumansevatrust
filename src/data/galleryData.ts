export interface GalleryItem {
  src: string
  category: string
  title: string
  caption: string
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Annadaan',
    title: 'Sacred Annadaan Offering',
    caption: 'Devotional food distribution to devotees and needy pilgrims.'
  },
  {
    src: '/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp',
    category: 'Bhajans & Kirtans',
    title: 'Spiritual Bhajans & Parayanam',
    caption: 'Devotees chanting Rama Nama and Hanuman Chalisa.'
  },
  {
    src: '/uploads/gallery/1775715404947-WhatsApp_Image_2026-04-09_at_00.37.50__2_.webp',
    category: 'Scripture Distribution',
    title: 'Sacred Text Seva',
    caption: 'Distributing Bhagavad Gita and Ramayana scriptures.'
  },
  {
    src: '/uploads/gallery/1775715398133-WhatsApp_Image_2026-04-09_at_00.37.52__2_.webp',
    category: 'Goshala Seva',
    title: 'Gau Seva & Protection',
    caption: 'Caring for cows and upholding sacred Sanatana Dharma values.'
  },
  {
    src: '/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Rathayatra',
    title: 'Divine Rathayatra Procession',
    caption: 'Sacred chariot carrying the holy deities through sacred streets.'
  },
  {
    src: '/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp',
    category: 'Satsang',
    title: 'Community Parayanam Satsang',
    caption: 'Devotional gatherings bringing families together in prayer.'
  },
  {
    src: '/uploads/gallery/1775715345483-WhatsApp_Image_2026-04-09_at_00.37.51__2_.webp',
    category: 'Festivals',
    title: 'Hanuman Jayanti Celebration',
    caption: 'Festival celebrations filled with devotion and gratitude.'
  }
]

export const galleryCategories: string[] = [
  'All Photos',
  'Annadaan',
  'Bhajans & Kirtans',
  'Goshala Seva',
  'Rathayatra',
  'Scripture Distribution',
  'Festivals'
]

