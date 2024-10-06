import { createConnection } from "@/dbConfig"; // Adjust the path if necessary
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary V2
import { PassThrough } from 'stream'; // Import PassThrough stream

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (image) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // Get the secure URL of the uploaded image
            }
        });

        // Convert the image to a stream and pipe it to Cloudinary
        const stream = new PassThrough();
        image.stream().pipe(stream);
        stream.pipe(uploadStream); // Pipe the stream to Cloudinary
    });
};

// Get a specific testimonial by ID
export async function GET(request, { params }) {
    const connection = await createConnection();
    try {
        const result = await connection.query('SELECT * FROM "Testimony" WHERE id = $1', [params.id]);
        const testimonial = result.rows[0];

        if (!testimonial) {
            return new Response("Testimonial not found", { status: 404 });
        }

        return new Response(JSON.stringify(testimonial), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error retrieving testimonial:", error);
        return new Response("Failed to retrieve testimonial", { status: 500 });
    } finally {
        await connection.end();
    }
}

// Update a testimonial
export async function PUT(request, { params }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const text = formData.get('text');
    const image = formData.get('image'); // Image is expected to be a stream

    const connection = await createConnection();
    try {
        // Get previous image URL from the database
        const previousResult = await connection.query('SELECT image FROM "Testimony" WHERE id = $1', [params.id]);
        const previous = previousResult.rows;

        let newImageUrl = previous.length > 0 ? previous[0].image : null; // Default to previous image URL

        // If a new image is provided, upload it to Cloudinary
        if (image) {
            newImageUrl = await uploadImageToCloudinary(image);
        }

        await connection.query(
            'UPDATE "Testimony" SET name = $1, image = $2, text = $3 WHERE id = $4',
            [name, newImageUrl, text, params.id] // Save new or previous image URL
        );

        return new Response("Testimonial updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return new Response("Failed to update testimonial", { status: 500 });
    } finally {
        await connection.end();
    }
}

// Delete a testimonial
export async function DELETE(request, { params }) {
    const connection = await createConnection();
    try {
        // Get image URL to delete from Cloudinary
        const previousResult = await connection.query('SELECT image FROM "Testimony" WHERE id = $1', [params.id]);
        const previous = previousResult.rows;

        if (previous.length > 0) {
            const previousImageUrl = previous[0].image;
            // Extract public ID from the URL for deletion
            const publicId = previousImageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
        }

        await connection.query('DELETE FROM "Testimony" WHERE id = $1', [params.id]);
        
        // Return an empty response with 204 status
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return new Response("Failed to delete testimonial", { status: 500 });
    } finally {
        await connection.end();
    }
}
