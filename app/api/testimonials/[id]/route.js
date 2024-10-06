import { createConnection } from "@/dbConfig"; // Adjust the import path if needed
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (image) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // Get the secure URL of the uploaded image
            }
        });

        image.pipe(uploadStream); // Pipe the image buffer to Cloudinary
    });
};

// Update a testimonial
export async function PUT(request, { params }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const text = formData.get('text');
    const image = formData.get('image');

    const connection = await createConnection();
    try {
        // Get previous image URL from the database
        const [previous] = await connection.query("SELECT image FROM testimony WHERE id = ?", [params.id]);
        
        let newImageUrl = previous.length > 0 ? previous[0].image : null; // Default to previous image URL

        // If a new image is provided, upload it to Cloudinary
        if (image) {
            newImageUrl = await uploadImageToCloudinary(image);
        }

        await connection.query(
            "UPDATE testimony SET name = ?, image = ?, text = ? WHERE id = ?",
            [name, newImageUrl, text, params.id] // Save new or previous image URL
        );

        return new Response("Testimonial updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return new Response("Failed to update testimonial", { status: 500 });
    } finally {
        await connection.end(); // Ensure connection is closed properly
    }
}

// Delete a testimonial
export async function DELETE(request, { params }) {
    const connection = await createConnection();
    try {
        // Get image URL to delete from Cloudinary
        const [previous] = await connection.query("SELECT image FROM testimony WHERE id = ?", [params.id]);
        
        if (previous.length > 0) {
            const previousImageUrl = previous[0].image;
            // Extract public ID from the URL for deletion
            const publicId = previousImageUrl.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(publicId); // Delete the image from Cloudinary
        }

        await connection.query("DELETE FROM testimony WHERE id = ?", [params.id]);
        return new Response("Testimonial deleted successfully", { status: 204 });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return new Response("Failed to delete testimonial", { status: 500 });
    } finally {
        await connection.end(); // Ensure connection is closed properly
    }
}
