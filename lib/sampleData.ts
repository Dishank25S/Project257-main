import { localDB } from '@/lib/localDB'

// Sample photos data
const SAMPLE_PHOTOS = [
  {
    category_id: '1', // Portraits
    title: 'Professional Portrait',
    description: 'A beautiful professional portrait photograph',
    url: '/placeholder.jpg',
    alt_text: 'Professional portrait photograph',
    display_order: 1,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'hero',
    view_count: 0,
  },
  {
    category_id: '2', // Weddings
    title: 'Wedding Ceremony',
    description: 'Beautiful wedding ceremony moment',
    url: '/placeholder.jpg',
    alt_text: 'Wedding ceremony photograph',
    display_order: 1,
    is_featured: true,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
  },
  {
    category_id: '3', // Events
    title: 'Corporate Event',
    description: 'Professional corporate event photography',
    url: '/placeholder.jpg',
    alt_text: 'Corporate event photograph',
    display_order: 1,
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
  }
]

// Sample videos data
const SAMPLE_VIDEOS = [
  {
    category_id: '1', // Portraits
    title: 'Portrait Photography Behind the Scenes',
    description: 'See how professional portraits are created',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    custom_thumbnail_url: null,
    duration: '3:45',
    display_order: 1,
    is_featured: true,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
  },
  {
    category_id: '2', // Weddings
    title: 'Wedding Photography Highlights',
    description: 'Beautiful moments from a recent wedding shoot',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    custom_thumbnail_url: null,
    duration: '5:20',
    display_order: 1,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'featured',
    view_count: 0,
  }
]

export function initializeSampleData() {
  // Add sample photos
  SAMPLE_PHOTOS.forEach(photo => {
    localDB.photos.create(photo)
  })

  // Add sample videos
  SAMPLE_VIDEOS.forEach(video => {
    localDB.videos.create(video)
  })

  console.log('Sample data initialized successfully!')
}

// Export for manual initialization if needed
export { SAMPLE_PHOTOS, SAMPLE_VIDEOS }
