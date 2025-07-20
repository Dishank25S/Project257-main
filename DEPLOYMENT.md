# Sharp Cinematic - Photography Portfolio Website

## Deployment Ready ✅

This is a modern photography portfolio website with a comprehensive admin dashboard, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎨 Frontend
- **Modern Design**: Clean, professional photography portfolio design
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Image Optimization**: Next.js Image component for optimal performance
- **SEO Optimized**: Built-in SEO features with Next.js

### 🔧 Admin Dashboard
- **8-Tab Management Interface**: 
  - Overview with analytics
  - Photo management with bulk operations
  - Video management (YouTube integration)
  - Category management
  - Upload interface with drag & drop
  - Contact information management
  - Live website preview
  - Settings and customization

### 💾 Database
- **localStorage Database**: No external dependencies
- **Real-time Updates**: Instant sync across all components
- **Type-safe Operations**: Full TypeScript support
- **Data Persistence**: Browser-based storage

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Website**
   - Main site: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
   - Admin password: `admin123`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure as static site

### Other Platforms
- Works on any platform that supports Next.js
- Static export ready with `npm run build`

## Admin Usage

1. **Login**: Visit `/admin/login` and use password `admin123`
2. **Upload Photos**: Use the Upload tab to add new photos
3. **Manage Videos**: Add YouTube video links in Videos tab
4. **Organize Content**: Create and manage categories
5. **Update Info**: Edit contact information and business details
6. **Preview**: Use Live Preview tab to see changes in real-time

## Security Notes

- Change the default admin password in the dashboard
- Admin authentication is handled client-side (suitable for personal portfolios)
- Data is stored locally in browser storage

## Customization

- **Colors**: Edit Tailwind config for brand colors
- **Content**: All content is manageable through the admin dashboard
- **Layout**: Modify components in `/components` directory
- **Styling**: Update global styles in `/app/globals.css`

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query
- **Storage**: localStorage with TypeScript interfaces

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Automatic with Next.js
- **Caching**: Browser caching for optimal performance

---

**Ready for production deployment! 🚀**

For support or customization, refer to the component documentation in the codebase.
