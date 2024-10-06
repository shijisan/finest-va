import { createClient } from '@vercel/postgres'; // Correct import for the client

const dbConfig = {
    connectionString: process.env.POSTGRES_URL, // Use the connection string from your environment variables
};

// Function to create a connection to the database
const createConnection = async () => {
    const client = createClient(); // Create a new Postgres client instance
    try {
        await client.connect(); // Connect to the database
        console.log("Database connected successfully!");
        return client; // Return the client instance for further queries
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error; // Re-throw the error after logging
    }
};

export { createConnection };
