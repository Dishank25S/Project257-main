import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Authentication function for admin access
const auth = async (req: Request) => {
  // Get authorization header
  const authHeader = req.headers.get("authorization");
  
  // Check if it's the admin token
  if (authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return { id: "admin" };
  }
  
  return null;
};

// FileRouter for your app
export const ourFileRouter = {
  // Image uploader for photos
  imageUploader: f({ 
    image: { 
      maxFileSize: "2MB", 
      maxFileCount: 10
    }
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized - Admin access required");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File url:", file.url);
      console.log("File size:", file.size);

      // Return data to the client
      return { 
        uploadedBy: metadata.userId, 
        url: file.url,
        name: file.name,
        size: file.size
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
