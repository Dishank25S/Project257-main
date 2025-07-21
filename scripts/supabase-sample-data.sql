-- Sample Photos Data (Run this AFTER creating tables and categories)
-- This will insert sample photos with references to the created category UUIDs

-- First, let's create a temporary function to get category IDs by slug
DO $$
DECLARE
    portraits_id UUID;
    landscapes_id UUID;
    architecture_id UUID;
    creative_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO portraits_id FROM categories WHERE slug = 'portraits' LIMIT 1;
    SELECT id INTO landscapes_id FROM categories WHERE slug = 'landscapes' LIMIT 1;
    SELECT id INTO architecture_id FROM categories WHERE slug = 'architecture' LIMIT 1;
    SELECT id INTO creative_id FROM categories WHERE slug = 'creative' LIMIT 1;
    
    -- Insert sample photos
    INSERT INTO photos (title, description, image_url, category_id, display_order, is_featured, alt_text, width, height) VALUES
        ('Professional Portrait Session', 'Studio portrait capturing natural expression and personality', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face&auto=format&q=80', portraits_id, 1, true, 'Professional headshot of a confident business person', 800, 600),
        ('Elegant Beauty Portrait', 'Classic beauty photography with dramatic lighting', 'https://images.unsplash.com/photo-1494790108755-2616c768e118?w=800&h=600&fit=crop&crop=face&auto=format&q=80', portraits_id, 2, true, 'Elegant portrait with soft lighting', 800, 600),
        
        ('Mountain Vista Sunrise', 'Breathtaking sunrise over mountain peaks with golden light', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80', landscapes_id, 1, true, 'Majestic mountain landscape at sunrise', 800, 600),
        ('Serene Lake Reflection', 'Perfect mirror reflection of mountains in still lake water', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format&q=80', landscapes_id, 2, true, 'Peaceful lake with mountain reflections', 800, 600),
        ('Forest Path Adventure', 'Misty forest trail leading into the unknown', 'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=800&h=600&fit=crop&auto=format&q=80', landscapes_id, 3, false, 'Atmospheric forest pathway', 800, 600),
        
        ('Modern Glass Architecture', 'Contemporary building with geometric glass facade', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format&q=80', architecture_id, 1, true, 'Modern architectural design with glass elements', 800, 600),
        ('Historic Stone Cathedral', 'Gothic architecture with intricate stone details', 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=800&h=600&fit=crop&auto=format&q=80', architecture_id, 2, false, 'Historic cathedral architecture', 800, 600),
        
        ('Abstract Light Painting', 'Creative long exposure light trails in darkness', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&auto=format&q=80', creative_id, 1, true, 'Abstract light painting photography', 800, 600)
    ON CONFLICT DO NOTHING;
    
    -- Insert sample videos
    INSERT INTO videos (title, description, video_url, thumbnail_url, category_id, display_order, is_featured, duration) VALUES
        ('Cinematic Landscape Timelapse', 'Time-lapse of changing light over mountain landscape', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80', landscapes_id, 1, true, 120),
        ('Portrait Session Behind the Scenes', 'Behind the scenes look at a professional portrait session', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80', portraits_id, 1, true, 180)
    ON CONFLICT DO NOTHING;
    
END $$;
