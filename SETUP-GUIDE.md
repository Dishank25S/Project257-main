# 🚀 Photography Website - Complete Setup Guide

## ✅ What's Been Configured

### 🔧 Supabase Integration
- ✅ Supabase client configured (`lib/supabase-client.ts`)
- ✅ Database service layer (`lib/supabase-db.ts`)
- ✅ All hooks updated for async operations
- ✅ Environment variables set in `.env.local`
- ✅ SQL schema ready for Supabase (`scripts/supabase-schema.sql`)
- ✅ Sample data script (`scripts/supabase-sample-data.sql`)

### 🔐 Admin Authentication
- ✅ Admin password set to: `admin123`
- ✅ Login URL: `/admin/login`
- ✅ Admin dashboard: `/admin/dashboard`

### 📸 Content
- ✅ 8 professional photography samples
- ✅ 4 categories (Portraits, Landscapes, Architecture, Creative)
- ✅ 2 sample videos
- ✅ Complete contact information

## 🎯 How to Start the Project

### Step 1: Verify Supabase Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run `scripts/supabase-schema.sql` (creates tables)
4. Run `scripts/supabase-sample-data.sql` (adds sample data)

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Start Development Server
```bash
pnpm dev
```

### Step 4: Test the Website
1. Visit `http://localhost:3000`
2. Check that photos load on the homepage
3. Visit `/portfolio` to see the gallery
4. Go to `/admin/login` and use password: `admin123`

## 🔧 Troubleshooting

### If Images Don't Load:
- Check that both SQL scripts ran successfully in Supabase
- Verify environment variables in `.env.local`
- Check browser console for any errors

### If Admin Login Fails:
- Use password: `admin123`
- Check browser console for authentication errors
- Verify ADMIN_PASSWORD in `.env.local`

### If Database Connection Fails:
- Verify Supabase project is active
- Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correct
- Ensure RLS policies allow public read access

## 📋 Project Structure

```
lib/
├── supabase-client.ts    # Supabase client configuration
├── supabase-db.ts        # Database service layer
├── supabase.ts           # Main database interface
└── staticData.ts         # TypeScript types and static data

hooks/
├── useAuth.ts            # Admin authentication
├── usePhotos.ts          # Photo management
├── useVideos.ts          # Video management
├── useCategories.ts      # Category management
└── useContactInfo.ts     # Contact information

scripts/
├── supabase-schema.sql      # Database tables
└── supabase-sample-data.sql # Sample content
```

## 🎉 Your Website Features

### Public Features:
- ✅ Professional photography gallery
- ✅ Responsive design for all devices
- ✅ Category-based filtering
- ✅ Contact information display
- ✅ Modern, clean UI

### Admin Features:
- ✅ Secure admin login
- ✅ Photo management (upload, edit, delete)
- ✅ Video management
- ✅ Category management
- ✅ Contact info editing

## 🚀 Ready for Production

Your website is ready to deploy to Vercel with:
- ✅ Real Supabase database
- ✅ Professional sample content
- ✅ Admin management system
- ✅ Optimized images and performance

**Admin Credentials:**
- URL: `/admin/login`
- Password: `admin123`

---

**Need help?** Check the browser console for any error messages and refer to this guide.
