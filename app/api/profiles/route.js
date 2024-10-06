import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

// Handle GET requests
export async function GET(req) {
    try {
        const profiles = await prisma.profile.findMany();
        return new Response(JSON.stringify(profiles), { status: 200 });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch profiles" }), { status: 500 });
    }
}

// Handle POST requests
export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const niches = formData.getAll('niches').filter(niche => niche.trim() !== '');
    const image = formData.get('image');

    try {
        let imageUrl = null; // Initialize imageUrl

        // Upload image to Cloudinary if it exists
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image.stream(), {
                folder: 'finestVa', // Optional: Specify folder to organize uploads
            });
            imageUrl = uploadResult.secure_url; // Get the URL of the uploaded image
        }

        // Create a profile in the database
        const profile = await prisma.profile.create({
            data: {
                name,
                image: imageUrl || null, // Use Cloudinary URL if available
                description,
                niches: niches.join(', '),
            },
        });

        return new Response(JSON.stringify(profile), { status: 201 });
    } catch (error) {
        console.error("Error saving profile:", error);
        return new Response(JSON.stringify({ message: "Failed to save profile" }), { status: 500 });
    }
}
