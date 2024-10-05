import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Function to create a connection to the database
const createConnection = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Database connected successfully!"); // Optional: log connection success
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error); // Log any connection errors
        throw error; // Re-throw the error after logging
    }
};

export { createConnection };
