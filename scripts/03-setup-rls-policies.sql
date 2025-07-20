-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories viewable by everyone" ON categories 
FOR SELECT USING (is_active = true);

CREATE POLICY "Photos viewable by everyone" ON photos 
FOR SELECT USING (is_active = true);

-- Create policies for admin access
CREATE POLICY "Admin full access to categories" ON categories 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to photos" ON photos 
FOR ALL USING (auth.role() = 'authenticated');

-- Storage policies
CREATE POLICY "Storage public read" ON storage.objects 
FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Storage admin upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');
