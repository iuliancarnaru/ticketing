import mongoose from 'mongoose';
import { app } from './app';

const PORT = 4000;

async function main() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Auth-MongoDb');
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => console.log(`Auth service running on port: ${PORT}`));
}

main();
