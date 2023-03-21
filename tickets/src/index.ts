import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const PORT = 4001;

async function main() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    // connect to NATS
    await natsWrapper.connect('ticketing', 'rand0m', 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    // watching for interrupt or terminated signals
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // connect to MONGOOSE
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Tickets-MongoDb');
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () =>
    console.log(`Tickets service running on port: ${PORT}`)
  );
}

main();
