import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Function to save an image
const saveImage = async (image) => {
    const filePath = path.join(uploadsDir, image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
};

// Function to delete an image from storage
const deleteImage = (fileName) => {
    const filePath = path.join(uploadsDir, fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted image: ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
};

// Handle GET, POST, PUT, DELETE requests
export async function GET(req) {
    try {
        const profiles = await prisma.profile.findMany();
        return new Response(JSON.stringify(profiles), { status: 200 });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch profiles" }), { status: 500 });
    }
}

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const niches = formData.getAll('niches').filter(niche => niche.trim() !== ''); // Get all niches as an array and filter out empty strings
    const image = formData.get('image');

    try {
        if (image) {
            await saveImage(image);
        }

        const profile = await prisma.profile.create({
            data: {
                name,
                image: image.name,
                description,
                niches: niches.join(', '), // Join the niches array into a string
            },
        });

        return new Response(JSON.stringify(profile), { status: 201 });
    } catch (error) {
        console.error("Error saving profile:", error);
        return new Response(JSON.stringify({ message: "Failed to save profile" }), { status: 500 });
    }
}

// Update a profile
export async function PUT(req) {
    const { id } = req.query; // Assuming the ID is passed as a query parameter
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const niches = formData.getAll('niches').filter(niche => niche.trim() !== ''); // Get all niches as an array and filter out empty strings
    const image = formData.get('image');

    try {
        const previousProfile = await prisma.profile.findUnique({
            where: { id: Number(id) },
        });

        if (!previousProfile) {
            return new Response(JSON.stringify({ message: "Profile not found" }), { status: 404 });
        }

        // Delete the previous image from storage
        if (previousProfile.image) {
            deleteImage(previousProfile.image);
        }

        if (image) {
            await saveImage(image);
        }

        const profile = await prisma.profile.update({
            where: { id: Number(id) },
            data: {
                name,
                image: image ? image.name : previousProfile.image, // Use new image or previous image name
                description,
                niches: niches.join(', '), // Join the niches array into a string
            },
        });

        return new Response(JSON.stringify(profile), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Failed to update profile" }), { status: 500 });
    }
}

// Delete a profile
export async function DELETE(req) {
    const { id } = req.query; // Assuming the ID is passed as a query parameter
    try {
        const previousProfile = await prisma.profile.findUnique({
            where: { id: Number(id) },
        });

        if (!previousProfile) {
            return new Response(JSON.stringify({ message: "Profile not found" }), { status: 404 });
        }

        // Delete the image from storage
        if (previousProfile.image) {
            deleteImage(previousProfile.image);
        }

        await prisma.profile.delete({
            where: { id: Number(id) },
        });

        return new Response(null, { status: 204 }); // No content to return
    } catch (error) {
        console.error("Error deleting profile:", error);
        return new Response(JSON.stringify({ message: "Failed to delete profile" }), { status: 500 });
    }
}
