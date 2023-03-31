import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@tkts/common';
import cookieSession from 'cookie-session';
import { createPaymentRouter } from './routes/new';

const app = express();

// express is behind the ingress nginx proxy
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    maxAge: 60 * 60 * 1000, // 1 hour
  })
);

app.use(currentUser);
app.use(createPaymentRouter);

// use 'all' to catch all methods (GET, POST...)
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
