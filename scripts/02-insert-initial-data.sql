-- Insert default categories
INSERT INTO categories (name, slug, description, display_order) VALUES 
('Pre-wedding', 'pre-wedding', 'Romantic pre-wedding photography sessions capturing love stories', 1),
('Maternity Shoot', 'maternity', 'Beautiful maternity photography celebrating new life', 2),
('Baby Shoot', 'baby', 'Adorable newborn and baby photography preserving precious moments', 3),
('Product Shoot', 'product', 'Professional product photography for businesses and brands', 4),
('Wedding Couple', 'wedding-couple', 'Beautiful wedding couple photography', 5),
('Wedding Candid', 'wedding-candid', 'Candid wedding moments captured naturally', 6),
('Model Shoot', 'model-shoot', 'Professional model photography sessions', 7),
('Makeup Shoot', 'makeup-shoot', 'Beauty and makeup photography', 8);

-- Insert sample photos
INSERT INTO photos (category_id, title, description, image_url, alt_text, is_featured, display_order) VALUES
((SELECT id FROM categories WHERE slug = 'pre-wedding'), 'Romantic Garden Session', 'Beautiful pre-wedding shoot in a garden setting', '/placeholder.svg?height=600&width=800', 'Romantic couple in garden setting', true, 1),
((SELECT id FROM categories WHERE slug = 'maternity'), 'Expecting Joy', 'Maternity photography celebrating new life', '/placeholder.svg?height=600&width=800', 'Pregnant woman in elegant pose', true, 1),
((SELECT id FROM categories WHERE slug = 'wedding-couple'), 'Wedding Bliss', 'Traditional wedding couple photography', '/placeholder.svg?height=600&width=800', 'Wedding couple in traditional attire', true, 1),
((SELECT id FROM categories WHERE slug = 'wedding-candid'), 'Candid Moments', 'Natural wedding candid photography', '/placeholder.svg?height=600&width=800', 'Candid wedding moment', false, 1),
((SELECT id FROM categories WHERE slug = 'model-shoot'), 'Fashion Portrait', 'Professional model photography', '/placeholder.svg?height=600&width=800', 'Professional model portrait', false, 1),
((SELECT id FROM categories WHERE slug = 'makeup-shoot'), 'Beauty Glamour', 'Makeup and beauty photography', '/placeholder.svg?height=600&width=800', 'Beauty makeup photography', false, 1);
