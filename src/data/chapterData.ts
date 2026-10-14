export interface ChapterMilestone {
  scrollFrac: number
  camX: number
  camY: number
  camZ: number
  targetX: number
  targetY: number
  targetZ: number
  hanumanPos: [number, number, number]
  hanumanScale: number
  hanumanPose: 'blessing' | 'namaskar' | 'heroic' | 'seated-meditation' | 'protective'
  chapterKey: string
  title: string
}

export const CHAPTER_TRAJECTORY: ChapterMilestone[] = [
  // 01. The Awakening (Misty Dawn Horizon, Entrance Vista)
  {
    scrollFrac: 0.0,
    camX: 0.0,
    camY: 1.8,
    camZ: 14.0,
    targetX: 0.0,
    targetY: 0.8,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, 0.0],
    hanumanScale: 1.0,
    hanumanPose: 'blessing',
    chapterKey: 'awakening',
    title: 'The Awakening'
  },
  // 02. The Temple Entrance (Passing through monumental Torana)
  {
    scrollFrac: 0.1,
    camX: 0.0,
    camY: 1.2,
    camZ: 9.0,
    targetX: 0.0,
    targetY: 0.5,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, 0.0],
    hanumanScale: 1.0,
    hanumanPose: 'blessing',
    chapterKey: 'gateway',
    title: 'Monumental Gateway'
  },
  // 03. Lord Hanuman Revealed (Golden Sanctum Abhaya Mudra)
  {
    scrollFrac: 0.2,
    camX: 0.0,
    camY: 0.35,
    camZ: 4.6,
    targetX: 0.0,
    targetY: 0.25,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, 0.0],
    hanumanScale: 1.0,
    hanumanPose: 'blessing',
    chapterKey: 'reveal',
    title: 'Lord Hanuman Revealed'
  },
  // 04. The Mission (Framing Hanuman on right, Mission text on left)
  {
    scrollFrac: 0.3,
    camX: -1.8,
    camY: 0.5,
    camZ: 4.8,
    targetX: 0.4,
    targetY: 0.3,
    targetZ: 0.0,
    hanumanPos: [0.8, 0.0, -0.2],
    hanumanScale: 0.98,
    hanumanPose: 'blessing',
    chapterKey: 'mission',
    title: 'Where Devotion Becomes Seva'
  },
  // 05. Impact Through Service (Heroic high-angle pillared vista)
  {
    scrollFrac: 0.4,
    camX: 0.0,
    camY: 1.5,
    camZ: 5.6,
    targetX: 0.0,
    targetY: 0.2,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, -0.5],
    hanumanScale: 1.0,
    hanumanPose: 'heroic',
    chapterKey: 'impact',
    title: 'Impact in Numbers'
  },
  // 06. The Seva Courtyard (Wide courtyard, 6 sacred pillars)
  {
    scrollFrac: 0.5,
    camX: 1.9,
    camY: 0.7,
    camZ: 4.8,
    targetX: -0.3,
    targetY: 0.3,
    targetZ: 0.0,
    hanumanPos: [-0.7, 0.0, -0.3],
    hanumanScale: 0.96,
    hanumanPose: 'heroic',
    chapterKey: 'pillars',
    title: 'Six Pillars of Seva'
  },
  // 07. The Annadaan Hall (Close warm service atmosphere)
  {
    scrollFrac: 0.62,
    camX: -1.5,
    camY: 0.4,
    camZ: 4.2,
    targetX: 0.3,
    targetY: 0.25,
    targetZ: 0.0,
    hanumanPos: [0.6, 0.0, 0.0],
    hanumanScale: 0.98,
    hanumanPose: 'blessing',
    chapterKey: 'annadaan',
    title: 'Sacred Annadaan Hall'
  },
  // 08. The Sacred Knowledge Chamber (Vyasa Peetha & Scriptures)
  {
    scrollFrac: 0.72,
    camX: 0.0,
    camY: 0.8,
    camZ: 4.8,
    targetX: 0.0,
    targetY: 0.3,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, -0.2],
    hanumanScale: 0.98,
    hanumanPose: 'namaskar',
    chapterKey: 'knowledge',
    title: 'Sacred Knowledge Chamber'
  },
  // 09. The Festival Courtyard (Festive marigold Rathayatra pavilion)
  {
    scrollFrac: 0.82,
    camX: 1.6,
    camY: 1.0,
    camZ: 5.2,
    targetX: -0.2,
    targetY: 0.4,
    targetZ: 0.0,
    hanumanPos: [-0.6, 0.0, 0.0],
    hanumanScale: 0.98,
    hanumanPose: 'heroic',
    chapterKey: 'events',
    title: 'Festival Courtyard'
  },
  // 10. The Gallery Corridor (Documentary exhibition)
  {
    scrollFrac: 0.9,
    camX: 0.0,
    camY: 0.6,
    camZ: 4.9,
    targetX: 0.0,
    targetY: 0.3,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, -0.3],
    hanumanScale: 0.98,
    hanumanPose: 'blessing',
    chapterKey: 'gallery',
    title: 'Documentary Gallery'
  },
  // 11. The Donation Sanctum (Abhaya blessing + verified UPI QR)
  {
    scrollFrac: 0.96,
    camX: -1.2,
    camY: 0.38,
    camZ: 4.4,
    targetX: 0.3,
    targetY: 0.25,
    targetZ: 0.0,
    hanumanPos: [0.75, 0.0, 0.0],
    hanumanScale: 1.0,
    hanumanPose: 'blessing',
    chapterKey: 'donation',
    title: 'Sanctum of Giving'
  },
  // 12. The Concluding Courtyard (Final peaceful namaskar & legal info)
  {
    scrollFrac: 1.0,
    camX: 0.0,
    camY: 0.8,
    camZ: 5.4,
    targetX: 0.0,
    targetY: 0.3,
    targetZ: 0.0,
    hanumanPos: [0, 0.0, 0.0],
    hanumanScale: 1.0,
    hanumanPose: 'namaskar',
    chapterKey: 'conclusion',
    title: 'Concluding Courtyard'
  }
]
