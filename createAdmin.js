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

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

        // Update the query to insert into finest_va
        const query = `INSERT INTO finestadmin (username, password) VALUES (?, ?)`;
        
        // Use a Promise to handle asynchronous execution
        await new Promise((resolve, reject) => {
            connection.execute(query, [username, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error inserting admin:', err);
                    reject(err); // Reject the promise on error
                } else {
                    console.log('Admin created successfully');
                    resolve(results); // Resolve the promise on success
                }
            });
        });
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        connection.end(); // Ensure the connection is closed after execution
    }
};

// Run the script
createAdmin();
