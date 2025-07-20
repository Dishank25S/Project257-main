# Photography Portfolio - Troubleshooting Guide

## 🚨 If You See a Blank Screen

The blank screen was likely caused by missing TypeScript functions. All issues have been fixed:

### ✅ **Fixed Issues:**
1. **useHomeVideos function missing** → Fixed to use `useHomeFeaturedVideos`
2. **image_url property errors** → Updated to use `url` property
3. **Missing category_name types** → Fixed type definitions
4. **is_active property references** → Removed (not needed in local DB)

## 🚀 **How to Start the Application**

### Option 1: Use the Batch File (Recommended for Windows)
```
Double-click: start-dev.bat
```

### Option 2: Enable PowerShell Scripts (if needed)
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Then: `npm run dev`

### Option 3: Use Node Directly
```
node_modules\.bin\next dev
```

## 📋 **Application Structure**

### **Main Pages:**
- **Home**: `http://localhost:3000` - Main portfolio page
- **Portfolio**: `http://localhost:3000/portfolio` - Photo galleries
- **About**: `http://localhost:3000/about` - About page
- **Services**: `http://localhost:3000/services` - Services page
- **Contact**: `http://localhost:3000/contact` - Contact information
- **Admin Login**: `http://localhost:3000/admin/login` - Admin access
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard` - Admin panel

### **Default Credentials:**
- **Admin Password**: `admin123`

## 🎯 **Getting Started Steps**

1. **Start the server** (using one of the methods above)
2. **Visit**: `http://localhost:3000`
3. **Go to Admin**: `http://localhost:3000/admin/login`
4. **Login** with password: `admin123`
5. **Add Sample Data**: Click "Add Sample Data" button in the admin dashboard
6. **Upload Photos**: Use the photo upload feature
7. **Manage Categories**: Create and organize your photo categories

## 🔧 **Local Database Features**

### **Data Storage:**
- **Categories**: Portraits, Weddings, Events (default)
- **Photos**: Stored as blob URLs in browser
- **Videos**: YouTube video integration
- **Contact**: Your business information
- **Settings**: Admin password and preferences

### **Admin Features:**
- ✅ **Photo Upload**: Drag & drop with metadata
- ✅ **Category Management**: Create/edit/delete categories
- ✅ **Video Management**: Add YouTube videos
- ✅ **Featured Content**: Mark items as featured
- ✅ **Contact Management**: Update business info

## 🛠 **Common Issues & Solutions**

### **"Cannot find module" errors:**
```bash
npm install
```

### **Blank screen after login:**
1. Clear browser localStorage: `localStorage.clear()`
2. Refresh the page
3. Try adding sample data in admin panel

### **Photos not showing:**
- Photos use blob URLs (temporary)
- For production, implement proper file storage
- Use the sample data feature to test

### **Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

## 🔄 **Reset Everything:**
If you want to start fresh:
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

## 📝 **Next Steps for Production:**

1. **File Storage**: Replace blob URLs with cloud storage (AWS S3, Cloudinary)
2. **Database**: Implement proper backend (PostgreSQL, MongoDB)
3. **Authentication**: Add secure user authentication
4. **Deployment**: Deploy to Vercel, Netlify, or your hosting provider

## 🆘 **Still Having Issues?**

1. **Check browser console** for error messages
2. **Verify Node.js version** (should be 16+ or 18+)
3. **Clear browser cache** and localStorage
4. **Try in incognito mode** to rule out extensions
5. **Check if port 3000 is available**

The application is now completely functional with local data storage!
