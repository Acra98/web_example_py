// Import the mysql package
const mysql = require('mysql');
const util = require('util');

// Define the connection parameters
const server = 'localhost'; // or '127.0.0.1' or your actual MySQL server address
const database = 'test';
const username = 'Ander';
const password = 'Ander1998';

// Create a configuration object
const config = {
    host: server,
    database: database,
    user: username,
    password: password,
    port: 3306  // Default MySQL port
};

// Create a connection pool
const pool = mysql.createPool(config);

// Promisify pool query to use async/await
pool.query = util.promisify(pool.query);

// Example: Connect to the database and execute a simple query
async function connectAndQuery() {
    try {
        // Execute the query using the pool
        const result = await pool.query('SELECT 1 as value');
        
        // Print the result
        console.log(result);
        return result;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
}

async function findUserByUsername(username) {
    try {
        // Use the connection pool to query
        const query = 'SELECT * FROM users WHERE username = ?';
        const result = await pool.query(query, [username]);
        
        // MySQL result is an array
        if (result && result.length > 0) {
            return result[0];
        }
        
        return null; // No user found with this username
    } catch (error) {
        console.error('Database error in findUserByUsername:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

async function registerUser(username, password, email) {
    try {
        await pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
    } catch (err) {
        console.error('Database error:', err);
        return { success: false, message: 'User registration failed' };
    }
}

// Export the functions to be used in other modules
module.exports = {
    connectAndQuery,
    findUserByUsername,
    registerUser
};
