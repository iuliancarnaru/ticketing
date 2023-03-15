import mongoose from 'mongoose';
import { app } from './app';

const PORT = 4001;

async function main() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017/auth');
    console.log('Connected to Tickets-MongoDb');
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () =>
    console.log(`Tickets service running on port: ${PORT}`)
  );
}

main();
