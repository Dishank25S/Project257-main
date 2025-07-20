# Sharp Cinematic - Photography Portfolio & Admin Dashboard

A professional photography portfolio website with a comprehensive admin dashboard, built with modern web technologies for optimal performance and user experience.

![Sharp Cinematic](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8)

## ✨ Features

### 🎨 Frontend Portfolio
- **Modern Design**: Clean, professional photography showcase
- **Mobile Responsive**: Pixel-perfect on all screen sizes
- **Smooth Animations**: Framer Motion for enhanced UX
- **Image Optimization**: Next.js Image with automatic WebP
- **SEO Optimized**: Built-in meta tags and structured data

### 🛠 Admin Dashboard
- **8-Tab Interface**: Complete content management system
- **Photo Management**: Upload, organize, and optimize images
- **Video Integration**: YouTube video embedding and management
- **Category System**: Flexible content organization
- **Real-time Preview**: See changes instantly
- **Contact Management**: Update business information
- **Analytics Overview**: Track portfolio performance

### 💾 Database
- **No External Dependencies**: localStorage-based database
- **Type-safe Operations**: Full TypeScript interfaces
- **Real-time Sync**: Instant updates across components
- **Data Persistence**: Browser-based storage

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd Project257-main

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Main site: http://localhost:3000
# Admin panel: http://localhost:3000/admin/login
```

### Admin Credentials
- **Username**: Admin access (no username required)
- **Password**: `admin123` (changeable in dashboard)

## 📱 Mobile Responsive Design

The website is built with a mobile-first approach:
- **Breakpoints**: Tailored for phones, tablets, and desktops
- **Touch Friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized images and code splitting
- **Smooth Scrolling**: Enhanced mobile navigation

## 🎯 Admin Dashboard Tabs

1. **Overview**: Analytics and quick stats
2. **Photos**: Upload and manage photography portfolio
3. **Videos**: YouTube video integration and management  
4. **Categories**: Organize content with custom categories
5. **Upload**: Drag & drop interface for new content
6. **Contact**: Manage business information and social links
7. **Preview**: Real-time website preview
8. **Settings**: Customize dashboard and site settings

## 🛡 Security

- **Client-side Authentication**: Suitable for personal portfolios
- **Password Protection**: Secure admin access
- **Data Validation**: Zod schema validation
- **Type Safety**: Full TypeScript coverage

## 🎨 Customization

### Colors & Branding
```css
/* Edit in tailwind.config.ts */
colors: {
  primary: '#your-brand-color',
  secondary: '#your-accent-color'
}
```

### Content Management
- All content editable through admin dashboard
- No code changes required for updates
- Real-time preview of changes

## 📦 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 14.x |
| **TypeScript** | Type Safety | 5.x |
| **Tailwind CSS** | Styling | 3.x |
| **Framer Motion** | Animations | Latest |
| **shadcn/ui** | UI Components | Latest |
| **React Hook Form** | Form Handling | Latest |
| **TanStack Query** | Data Fetching | Latest |
| **Zod** | Schema Validation | Latest |

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Other Platforms
- **Netlify**: Upload build output
- **Cloudflare Pages**: Connect GitHub repository
- **AWS S3**: Static hosting with CloudFront

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for Google rankings
- **Image Optimization**: Automatic format conversion
- **Code Splitting**: Minimal bundle size

## 🔧 Development

### Project Structure
```
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── admin/          # Admin dashboard
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and database
└── public/             # Static assets
```

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint checking
```

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types
2. **Image Loading**: Verify image paths in public folder
3. **Admin Access**: Clear browser storage if issues persist

### Support
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review component documentation
- Validate localStorage data structure

## 📄 License

This project is designed for photography portfolio use. Customize and deploy as needed.

---

**Built with ❤️ for photographers who want a professional online presence**
