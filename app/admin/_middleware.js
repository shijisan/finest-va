// app/admin/_middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token'); // Get token from cookies or localStorage if applicable

    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
}
