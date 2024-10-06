import { createConnection } from "@/dbConfig"; // Adjust the path if necessary
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary V2
import { Readable } from 'stream'; // Import Readable to create a stream

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch all testimonials
export async function GET(req) {
    const client = await createConnection();

    try {
        const result = await client.query('SELECT * FROM "Testimony" ORDER BY "createdAt" DESC'); // Fetch all testimonials
        // Return the testimonials
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } finally {
        await client.end(); // Ensure the database connection is closed
    }
}


// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (image) => {
    return new Promise((resolve, reject) => {
        // Check if image is a valid File object
        if (!image) {
            reject(new Error("No image provided."));
            return;
        }

        // Create a readable stream from the File object
        const stream = Readable.from(image.stream());

        // Upload the image to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // Get the secure URL of the uploaded image
            }
        });

        stream.pipe(uploadStream); // Pipe the stream to Cloudinary
    });
};

// Create a new testimonial
export async function POST(req) {
    const client = await createConnection();
    const body = await req.formData(); // Use formData to handle incoming data

    try {
        const name = body.get('name'); // Extract name from form data
        const text = body.get('text'); // Extract text from form data
        const image = body.get('image'); // Extract image from form data

        // Log the received values
        console.log("Received data:", { name, text, image });

        // Check if image is provided
        if (!image) {
            throw new Error("Image is required.");
        }

        // Upload image if provided
        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImageToCloudinary(image);
        }

        const result = await client.query(
            'INSERT INTO "Testimony" (name, text, image, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, text, imageUrl, new Date(), new Date()]
        );
        
        


        // Return the newly created testimonial
        return new Response(JSON.stringify(result.rows[0]), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error inserting testimonial:", error);
        // Provide a more detailed error message
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } finally {
        await client.end(); // Ensure the database connection is closed
    }
}
