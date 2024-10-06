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

// Handle GET and POST requests
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
