# Image Hosting Setup for Vercel Deployment

## Problem
When you upload images through the admin panel on Vercel, they get stored in localStorage which doesn't persist between serverless function calls. This causes uploaded images to disappear after deployment.

## Solution
The project now supports cloud image hosting using ImgBB (free) for production deployments.

## Setup Instructions

### 1. Get a Free ImgBB API Key
1. Go to https://api.imgbb.com/
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variables

#### For Local Development:
Update your `.env.local` file:
```bash
NEXT_PUBLIC_IMGBB_API_KEY=your_actual_api_key_here
```

#### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add a new variable:
   - **Name**: `NEXT_PUBLIC_IMGBB_API_KEY`
   - **Value**: Your actual ImgBB API key
   - **Environment**: Production

### 3. Redeploy
After adding the environment variable, redeploy your Vercel project.

## How It Works

- **Development Mode**: Images are stored as base64 in localStorage (for quick testing)
- **Production Mode**: Images are uploaded to ImgBB cloud hosting (persistent storage)
- **Fallback**: If ImgBB upload fails, it automatically falls back to base64

## Alternative Image Hosting Services

If you prefer other services, you can modify the `uploadToImgBB` function in `components/admin/PhotoUpload.tsx` to use:

- **Cloudinary** (free tier available)
- **Uploadcare** (free tier available)
- **Firebase Storage** (Google's solution)
- **AWS S3** (pay-as-you-go)

## Benefits

✅ **Persistent Storage**: Images survive Vercel deployments
✅ **Fast Loading**: Images served from CDN
✅ **Free Tier**: ImgBB offers generous free usage
✅ **Automatic Fallback**: Base64 backup if cloud upload fails
✅ **Easy Setup**: Just add one environment variable

## Verification

After setup, when you upload images in production:
1. Check the browser console for "Successfully uploaded to ImgBB" messages
2. Uploaded images should have URLs like `https://i.ibb.co/...`
3. Images should persist after redeployment

## Troubleshooting

- **Images still not showing**: Check Vercel environment variables are set correctly
- **Upload fails**: Check API key is valid and has remaining quota
- **Base64 fallback**: The system will automatically use base64 if cloud upload fails
