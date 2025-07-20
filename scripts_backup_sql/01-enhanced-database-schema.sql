-- Enhanced Photos Table
ALTER TABLE photos ADD COLUMN IF NOT EXISTS is_home_featured BOOLEAN DEFAULT false;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS home_display_section VARCHAR(50);
ALTER TABLE photos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  youtube_id VARCHAR(50) NOT NULL,
  custom_thumbnail_url TEXT,
  duration VARCHAR(20),
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_home_featured BOOLEAN DEFAULT false,
  home_display_section VARCHAR(50),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home Content Management Table
CREATE TABLE IF NOT EXISTS home_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  content_id UUID NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Information Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photographer_name VARCHAR(100) DEFAULT 'Krishna Broker',
  phone VARCHAR(20) DEFAULT '+91 9665984974',
  location VARCHAR(100) DEFAULT 'Swargate, Pune',
  email VARCHAR(100),
  instagram_url TEXT,
  facebook_url TEXT,
  whatsapp_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact info
INSERT INTO contact_info (photographer_name, phone, location, email) 
VALUES ('Krishna Broker', '+91 9665984974', 'Swargate, Pune', 'krishnabroker@example.com')
ON CONFLICT DO NOTHING;
