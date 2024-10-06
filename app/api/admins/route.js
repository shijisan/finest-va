// app/api/admins/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // Query all admins from the finestAdmin table
        const admins = await prisma.finestAdmin.findMany();
        return NextResponse.json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }
}

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Create a new admin
        const newAdmin = await prisma.finestAdmin.create({
            data: {
                username: username,
                password: password, // Remember to hash the password before storing it
            },
        });

        return NextResponse.json({ message: 'Admin created', id: newAdmin.id }, { status: 201 });
    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }
}
