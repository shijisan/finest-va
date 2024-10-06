import { getXataClient } from '@/src/xata'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create first admin user
const createAdmin = async () => {
    const xata = getXataClient(); // Get Xata client instance
    const username = process.env.ADMIN_USERNAME;
    const plainTextPassword = process.env.ADMIN_PASSWORD; // Change this to a secure password

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

        // Use Xata to insert the new admin
        const result = await xata.db.finestadmin.create({
            username: username,
            password: hashedPassword,
        });

        console.log('Admin created successfully:', result);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

// Run the script
createAdmin();
