// app/api/admins/route.js
import { NextResponse } from 'next/server';
import { createConnection } from '@/dbConfig'; // Adjust based on your configuration setup

export async function GET(request) {
    const connection = await createConnection();
    const [admins] = await connection.execute('SELECT * FROM finestadmin');
    await connection.end();
    return NextResponse.json(admins);
}

export async function POST(request) {
    const { username, password } = await request.json();

    const connection = await createConnection();
    const [result] = await connection.execute('INSERT INTO finestadmin (username, password) VALUES (?, ?)', [username, password]);
    await connection.end();

    return NextResponse.json({ message: 'Admin created', id: result.insertId }, { status: 201 });
}
