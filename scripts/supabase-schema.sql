-- Supabase Database Schema for Photography Website
-- Run this SQL in your Supabase SQL Editor to create the tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  alt_text VARCHAR(200),
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  duration INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info table (single record)
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  photographer_name VARCHAR(255),
  phone VARCHAR(50),
  location TEXT,
  email VARCHAR(255),
  instagram_url VARCHAR(255),
  facebook_url VARCHAR(255),
  whatsapp_url VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_photos_category_id ON photos(category_id);
CREATE INDEX IF NOT EXISTS idx_photos_featured ON photos(is_featured);
CREATE INDEX IF NOT EXISTS idx_photos_display_order ON photos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_category_id ON videos(category_id);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_videos_display_order ON videos(display_order);

-- Update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create update triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data with proper UUIDs
INSERT INTO categories (name, description, slug) VALUES
  ('Portraits', 'Professional portrait photography showcasing personality and emotion', 'portraits'),
  ('Landscapes', 'Breathtaking natural landscapes and scenic photography', 'landscapes'),
  ('Architecture', 'Architectural photography highlighting design and structure', 'architecture'),
  ('Creative', 'Artistic and experimental photography pushing creative boundaries', 'creative')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample contact info
INSERT INTO contact_info (photographer_name, phone, location, email, instagram_url, facebook_url, whatsapp_url) VALUES
  ('Photography Studio', '+1 (555) 123-4567', '123 Photography Street, Creative District, NY 10001', 'hello@photographystudio.com', 'https://instagram.com/photographystudio', 'https://facebook.com/PhotographyStudioNY', null)
ON CONFLICT (id) DO NOTHING;

-- Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON photos FOR SELECT USING (true);
CREATE POLICY "Public read access" ON videos FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact_info FOR SELECT USING (true);

-- Admin write access (you can customize this based on your auth setup)
-- For now, allowing all authenticated users to write (you can restrict this later)
CREATE POLICY "Authenticated write access" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
