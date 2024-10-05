import { createConnection } from "@/dbConfig"; // Adjust the import path if needed
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

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

// Update a testimonial
export async function PUT(request, { params }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const text = formData.get('text');
    const image = formData.get('image');

    const connection = await createConnection();
    try {
        // Get previous image file name from the database
        const [previous] = await connection.query("SELECT image FROM testimony WHERE id = ?", [params.id]);
        
        if (previous.length > 0) {
            const previousImageName = previous[0].image;
            // Delete the previous image from storage
            deleteImage(previousImageName);
        }

        if (image) {
            await saveImage(image);
        }

        await connection.query(
            "UPDATE testimony SET name = ?, image = ?, text = ? WHERE id = ?",
            [name, image ? image.name : previous[0].image, text, params.id] // Save new or previous image name
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
        // Get image file name to delete
        const [previous] = await connection.query("SELECT image FROM testimony WHERE id = ?", [params.id]);
        
        if (previous.length > 0) {
            const previousImageName = previous[0].image;
            // Delete the image from storage
            deleteImage(previousImageName);
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
