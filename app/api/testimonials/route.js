import { createConnection } from "@/dbConfig"; // Adjust the import path if needed
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Function to save an image
const saveImage = async (image) => {
    const filePath = path.join(uploadsDir, image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
};

// Fetch testimony
export async function GET() {
    const connection = await createConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM testimony");
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Error fetching testimony:", error);
        return new Response("Failed to fetch testimony", { status: 500 });
    } finally {
        await connection.end(); // Ensure connection is closed properly
    }
}

// Create a new testimonial
export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const text = formData.get('text');
    const image = formData.get('image');

    const connection = await createConnection();
    try {
        if (image) {
            await saveImage(image);
        }
        
        const [result] = await connection.query(
            "INSERT INTO testimony (name, image, text) VALUES (?, ?, ?)",
            [name, image.name, text] // Save image name to DB
        );

        return new Response(JSON.stringify({ id: result.insertId, name, image: image.name, text }), { status: 201 });
    } catch (error) {
        console.error("Error saving testimonial:", error);
        return new Response("Failed to save testimonial", { status: 500 });
    } finally {
        await connection.end(); // Ensure connection is closed properly
    }
}
