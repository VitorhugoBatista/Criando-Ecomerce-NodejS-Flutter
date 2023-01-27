import dotenv from 'dotenv';

// getting all ENV variables before starting another processes
dotenv.config();

export default {
  mongoDbUrl: process.env.MONGO_DB_URL,
  port: process.env.PORT,
};
