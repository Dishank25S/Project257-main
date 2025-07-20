-- Insert sample videos
INSERT INTO videos (category_id, title, description, youtube_url, youtube_id, duration, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'pre-wedding' LIMIT 1), 'Beautiful Pre-Wedding Story', 'A romantic pre-wedding shoot in Pune', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', '3:45', true),
((SELECT id FROM categories WHERE slug = 'maternity' LIMIT 1), 'Maternity Photography Session', 'Capturing the beauty of motherhood', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', '2:30', false),
((SELECT id FROM categories WHERE slug = 'baby' LIMIT 1), 'Newborn Photography Tips', 'Behind the scenes of a baby photoshoot', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', '4:12', true);

-- Update some photos for home page display
UPDATE photos SET is_home_featured = true, home_display_section = 'hero' WHERE is_featured = true LIMIT 3;
UPDATE photos SET is_home_featured = true, home_display_section = 'top' WHERE id IN (SELECT id FROM photos WHERE is_home_featured = false LIMIT 6);
UPDATE photos SET is_home_featured = true, home_display_section = 'bottom' WHERE id IN (SELECT id FROM photos WHERE is_home_featured = false LIMIT 8);
