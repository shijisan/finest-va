const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const bcrypt = require('bcrypt');
require('dotenv').config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Create first admin user
const createAdmin = async () => {
    const username = process.env.ADMIN_USERNAME;
    const plainTextPassword = process.env.ADMIN_PASSWORD; // Ensure this is a secure password

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

        // Insert into finestAdmin using Prisma
        const admin = await prisma.finestAdmin.create({
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect(); // Ensure the connection is closed after execution
    }
};

// Run the script
createAdmin();
