// app/api/admins/[id]/route.js
import { NextResponse } from 'next/server';
import { createConnection } from '@/dbConfig'; // Adjust based on your configuration setup
import bcrypt from 'bcryptjs/dist/bcrypt';

export async function GET(request, { params }) {
    const { id } = params;
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM finest_admin WHERE id = ?', [id]);
    await connection.end();

    if (rows.length === 0) {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { username, password } = await request.json();

    // Log the incoming request data for debugging
    console.log('Updating admin:', { id, username, password });

    // Create a database connection
    const connection = await createConnection();

    try {
        // Optionally hash the password if you're storing hashed passwords
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

        // Update the admin in the database
        const [result] = await connection.execute(
            'UPDATE finest_admin SET username = ?, password = ? WHERE id = ?',
            [username, hashedPassword, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error updating admin:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await connection.end(); // Ensure the connection is closed
    }
}


export async function DELETE(request, { params }) {
    const { id } = params;

    const connection = await createConnection();
    const [result] = await connection.execute('DELETE FROM finest_admin WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Admin deleted' });
}
