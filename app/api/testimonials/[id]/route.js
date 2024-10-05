// /api/testimonials/[id]/route.js

import { NextResponse } from 'next/server';
import createConnection from '@/dbConfig'; // Adjust the path based on your file structure

// Function to handle GET, PUT, and DELETE requests for a single testimonial
export async function GET(request, { params }) {
    const { id } = params;

    try {
        const connection = await createConnection(); // Ensure you get a connection
        const [testimonial] = await connection.query('SELECT * FROM Testimony WHERE id = ?', [id]);

        if (testimonial.length === 0) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json(testimonial[0]);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const connection = await createConnection(); // Ensure you get a connection
        const { name, image, text } = await request.json();
        
        const [result] = await connection.query('UPDATE Testimony SET name = ?, image = ?, text = ? WHERE id = ?', [name, image, text, id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        
        return NextResponse.json({ id, name, image, text });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const connection = await createConnection(); // Ensure you get a connection
        const [result] = await connection.query('DELETE FROM Testimony WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
