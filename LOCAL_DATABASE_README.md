# Local Database Photography Portfolio

This photography portfolio application now uses **localStorage** for data persistence instead of external database services. All your data is stored locally in your browser.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Access the Application**
   - Visit `http://localhost:3000` to see your portfolio
   - Visit `http://localhost:3000/admin/login` to access the admin dashboard

## 🔐 Admin Setup

On first visit to the admin area, you'll be prompted to set up an admin password. The default password is `admin123`, but you can change it through the setup process.

### Admin Features:
- **Categories Management**: Create, edit, and delete photo categories
- **Photo Management**: Upload, organize, and manage your photo portfolio
- **Video Management**: Add YouTube videos to your portfolio
- **Contact Information**: Update your contact details and social links
- **Sample Data**: Initialize with sample content to get started quickly

## 📊 Data Storage

All data is stored locally in your browser's localStorage:

- **Categories**: Photography categories (Portraits, Weddings, Events, etc.)
- **Photos**: Your photo portfolio with metadata
- **Videos**: YouTube video links and descriptions
- **Contact Info**: Your contact information and social media links
- **Admin Auth**: Encrypted admin password

### Data Persistence Notes:
- Data persists between browser sessions
- Data is tied to your specific browser and device
- Clearing browser data will remove all portfolio content
- For production use, consider implementing a proper backend solution

## 🎨 Features

### Portfolio Features:
- **Responsive Design**: Works on desktop and mobile devices
- **Category-based Organization**: Organize photos by categories
- **Featured Content**: Highlight your best work
- **Video Integration**: Embed YouTube videos
- **Contact Information**: Display your contact details
- **Dark/Light Theme**: Theme switching support

### Admin Dashboard Features:
- **Photo Upload**: Drag-and-drop photo uploads with metadata
- **Category Management**: Create and organize categories
- **Content Management**: Mark photos as featured or home page content
- **Video Management**: Add YouTube videos with custom thumbnails
- **Contact Management**: Update contact information and social links

## 🛠 Technical Implementation

### Architecture:
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for data fetching and caching
- **Data Storage**: localStorage with a custom API layer
- **Authentication**: Simple password-based admin authentication

### Key Files:
- `lib/localDB.ts`: Local database implementation
- `lib/supabase.ts`: Exports from localDB (maintains compatibility)
- `hooks/`: React Query hooks for data operations
- `components/admin/`: Admin dashboard components

## 🔄 Migration from External Database

If you were previously using external databases:

1. **Export your existing data** from your previous database
2. **Format the data** to match the TypeScript interfaces in `lib/localDB.ts`
3. **Import data** by calling the appropriate `localDB` methods
4. **Or use the admin interface** to manually add your content

## 🚨 Production Considerations

For a production deployment, consider:

1. **Backend Database**: Implement a proper backend with PostgreSQL, MongoDB, etc.
2. **File Storage**: Use cloud storage like AWS S3, Cloudinary, or similar
3. **Authentication**: Implement proper user authentication and authorization
4. **Data Backup**: Regular backups of your content
5. **SEO**: Server-side rendering for better search engine optimization

## 🆘 Troubleshooting

### Common Issues:

**Data not persisting:**
- Check if localStorage is enabled in your browser
- Ensure you're not in incognito/private mode

**Photos not loading:**
- Photos use blob URLs which are temporary
- For production, implement proper file storage

**Admin access issues:**
- Default password is `admin123`
- Use browser dev tools to clear localStorage if needed: `localStorage.clear()`

### Resetting Data:
To completely reset the application:
```javascript
// Run in browser console
localStorage.clear()
location.reload()
```

## 📝 License

This project is open source and available under the MIT License.
