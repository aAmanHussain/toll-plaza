import { config } from 'dotenv';
import { MongoClient, connect } from 'mongodb';

export const initConnection = async () => {
  try {
    config();
    const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
    const connection: MongoClient = await connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/`, { useUnifiedTopology: true, useNewUrlParser: true });
    if (!connection) {
      throw new Error(`Database connection not established`);
    }
    const db = connection.db(MONGO_DATABASE);
    return db;
  } catch (ex) {
    throw ex;
  }
};
