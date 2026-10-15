export interface GalleryItem {
  src: string
  category: string
  title: string
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Annadaan',
    title: 'Annadaan photographs'
  },
  {
    src: '/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp',
    category: 'Bhajans & Kirtans',
    title: 'Bhajans & Kirtans photographs'
  },
  {
    src: '/uploads/gallery/1775715404947-WhatsApp_Image_2026-04-09_at_00.37.50__2_.webp',
    category: 'Scripture Distribution',
    title: 'Scripture Distribution photographs'
  },
  {
    src: '/uploads/gallery/1775715398133-WhatsApp_Image_2026-04-09_at_00.37.52__2_.webp',
    category: 'Goshala Seva',
    title: 'Goshala Seva photographs'
  },
  {
    src: '/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Rathayatra',
    title: 'Rathayatra photographs'
  },
  {
    src: '/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp',
    category: 'Satsang',
    title: 'Satsang photographs'
  },
  {
    src: '/uploads/gallery/1775715345483-WhatsApp_Image_2026-04-09_at_00.37.51__2_.webp',
    category: 'Festivals',
    title: 'Festival photographs'
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
