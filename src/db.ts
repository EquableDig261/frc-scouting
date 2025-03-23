import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from the .env file
  ssl: {
    rejectUnauthorized: false,  // Optional: Ensure the connection uses SSL
  },
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Database connection error:', err.stack);
  });

export default client;
