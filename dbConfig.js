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
        const connection = await mysql.createConnection(dbConfig); // This should be fine
        console.log("Database connected successfully!");
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error; // Re-throw the error after logging
    }
};

export { createConnection };
