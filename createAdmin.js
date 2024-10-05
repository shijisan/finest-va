// createAdmin.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Set up MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create first admin user
const createAdmin = async () => {
    const username = process.env.ADMIN_USERNAME;
    const plainTextPassword = process.env.ADMIN_PASSWORD; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    const query = `INSERT INTO finest_admin (username, password) VALUES (?, ?)`;
    connection.execute(query, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error inserting admin:', err);
        } else {
            console.log('Admin created successfully');
        }
        connection.end();
    });
};

// Run the script
createAdmin();
