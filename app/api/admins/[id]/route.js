// app/api/admins/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = params;

    try {
        // Find the admin by ID
        const admin = await prisma.finestAdmin.findUnique({
            where: { id: Number(id) }, // Ensure the id is a number
        });

        if (!admin) {
            return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { username, password } = await request.json();

    // Log the incoming request data for debugging
    console.log('Updating admin:', { id, username, password });

    try {
        // Optionally hash the password if you're storing hashed passwords
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

        // Update the admin in the database
        const admin = await prisma.finestAdmin.update({
            where: { id: Number(id) }, // Ensure the id is a number
            data: {
                username,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error updating admin:', error);
        if (error.code === 'P2025') {
            // If admin not found, Prisma throws a P2025 error
            return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const admin = await prisma.finestAdmin.delete({
            where: { id: Number(id) }, // Ensure the id is a number
        });

        return NextResponse.json({ message: 'Admin deleted' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        if (error.code === 'P2025') {
            // If admin not found, Prisma throws a P2025 error
            return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }
}
