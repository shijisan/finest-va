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

        // Do not modify the image URL, just return it as stored in the database
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
            if (image instanceof File) {
                const buffer = await getImageBuffer(image);

                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        folder: 'finestVa', // Specify folder to organize uploads
                    }, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });

                    uploadStream.end(buffer);
                });

                imageUrl = uploadResult.secure_url; // Get the URL of the uploaded image
                console.log("Uploaded Image URL:", imageUrl); // Log the URL to verify
            } else {
                throw new TypeError('Expected image to be an instance of File');
            }
        }

        // Create a profile in the database
        const profile = await prisma.profile.create({
            data: {
                name,
                image: imageUrl || null, // Use Cloudinary URL directly
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





// Helper function to convert the image to a Buffer
const getImageBuffer = async (file) => {
    const arrayBuffer = await file.arrayBuffer(); // Get the ArrayBuffer from the File
    return Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
};
