import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { dbConfig } from '@/dbConfig'; // Adjust based on your configuration setup
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const { username, password } = await request.json();

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute('SELECT * FROM finest_admin WHERE username = ?', [username]);

    if (rows.length === 0) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const admin = rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
}
