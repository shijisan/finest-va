import { NextResponse } from 'next/server';
import { createConnection } from '@/dbConfig'; // Adjust the path based on your file structure

// Function to handle GET requests
export async function GET() {
    try {
        const connection = await createConnection(); // Ensure you get a connection
        const [testimonials] = await connection.query('SELECT * FROM Testimony ORDER BY createdAt DESC');
        
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

// Function to handle POST requests
export async function POST(request) {
    try {
        const { name, image, text } = await request.json();
        
        const connection = await createConnection(); // Ensure you get a connection
        const [result] = await connection.query('INSERT INTO Testimony (name, image, text) VALUES (?, ?, ?)', [name, image, text]);
        
        return NextResponse.json({ id: result.insertId, name, image, text }, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
