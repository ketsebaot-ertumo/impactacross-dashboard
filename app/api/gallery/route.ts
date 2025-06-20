// app/api/cloudinary/route.js

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle PUT to delete image by public_id
export async function PUT(request: Request) {
  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return new Response(JSON.stringify({ error: 'Missing public_id' }), { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err: any) {
    console.error("Error deleting image:", err);
    return new Response(JSON.stringify(
        { error: 'Failed to delete image', detail: err.message }), 
        { status: 500 }
    );
  }
}
