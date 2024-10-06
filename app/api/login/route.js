import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client
import jwt from 'jsonwebtoken';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request) {
    const { username, password } = await request.json();

    // Query the database using Prisma
    const admin = await prisma.finestAdmin.findUnique({
        where: { username: username }, // Find admin by username
    });

    if (!admin) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
}
