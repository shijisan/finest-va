import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DELETE API Route to Delete Profile
export async function DELETE(req, { params }) {
    const { id } = params;

    console.log("Deleting profile with ID:", id); // Log for debugging

    try {
        // Fetch the profile to get the image public ID
        const profile = await prisma.profile.findUnique({
            where: { id: parseInt(id, 10) },
        });

        // If the profile doesn't exist, return a 404 response
        if (!profile) {
            return new Response(JSON.stringify({ error: 'Profile not found' }), { status: 404 });
        }

        // Delete the image from Cloudinary if it exists
        if (profile.image) {
            const publicId = profile.image.split('/').pop().split('.')[0]; // Get public ID from image URL
            await cloudinary.uploader.destroy(publicId); // Remove image from Cloudinary
        }

        // Proceed to delete the profile from the database
        const deletedProfile = await prisma.profile.delete({
            where: { id: parseInt(id, 10) }, // Ensure id is parsed correctly
        });

        return new Response(
            JSON.stringify({ message: 'Profile deleted successfully', deletedProfile }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting profile:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete profile' }),
            { status: 500 }
        );
    }
}

// You can remove the runtime export for Vercel
