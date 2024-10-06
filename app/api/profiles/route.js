import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to save an image
const saveImage = async (image) => {
    // Check if image is valid
    if (!image) return;
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadsDir, image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    
    // Ensure uploadsDir exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);
};

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
        if (image) {
            await saveImage(image); // Make sure to handle image saving properly
        }

        const profile = await prisma.profile.create({
            data: {
                name,
                image: image?.name || null, // Handle case where image might not be present
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

// Use the new runtime export
export const runtime = 'nodejs'; // Use Node.js runtime if you're handling file system operations
