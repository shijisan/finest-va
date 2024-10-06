import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getXataClient } from '@/src/xata.js'; // Adjust the path to your xata.js
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const { username, password } = await request.json();
    
    // Get the Xata client instance
    const xata = getXataClient();
    
    // Query the FinestAdmin table in Xata
    const admins = await xata.finest_admins.filter({ username }).getMany();

    if (admins.length === 0) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const admin = admins[0];

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
}
