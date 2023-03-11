import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const PORT = 4000;
const app = express();

// express is behind the ingress nginx proxy
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// use 'all' to catch all methods (GET, POST...)
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

async function main() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
}

main();
