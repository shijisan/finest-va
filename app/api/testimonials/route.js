import { createConnection } from "@/dbConfig"; // Adjust the import path if needed
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadImageToCloudinary = async (image) => {
    const buffer = Buffer.from(await image.arrayBuffer());

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                folder: 'testimonials', // Optional folder in Cloudinary
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url); // Return the URL of the uploaded image
                }
            }
        );

        // Write the buffer to Cloudinary's upload stream
        uploadStream.end(buffer);
    });
};

// Fetch testimony from PostgreSQL
export async function GET() {
    const client = await createConnection();
    try {
        const result = await client.query("SELECT * FROM testimony");
        const rows = result.rows;
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Error fetching testimony:", error);
        return new Response("Failed to fetch testimony", { status: 500 });
    } finally {
        client.release(); // Ensure connection is closed properly
    }
}

// Create a new testimonial
export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const text = formData.get('text');
    const image = formData.get('image'); // Assuming this is a file

    const client = await createConnection();
    let imageUrl = null;

    try {
        // Upload image to Cloudinary if it exists
        if (image) {
            imageUrl = await uploadImageToCloudinary(image);
        }

        // Insert the testimonial into the PostgreSQL database
        const result = await client.query(
            "INSERT INTO testimony (name, image, text) VALUES ($1, $2, $3) RETURNING *",
            [name, imageUrl, text]
        );

        // Get the inserted row
        const insertedTestimonial = result.rows[0];

        return new Response(JSON.stringify(insertedTestimonial), { status: 201 });
    } catch (error) {
        console.error("Error saving testimonial:", error);
        return new Response("Failed to save testimonial", { status: 500 });
    } finally {
        client.release(); // Ensure connection is closed properly
    }
}
