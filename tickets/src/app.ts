import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@tkts/common';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { allTicketsRouter } from './routes/all';
import { updateTicketRouter } from './routes/update';

const app = express();

// express is behind the ingress nginx proxy
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(allTicketsRouter);
app.use(updateTicketRouter);

// use 'all' to catch all methods (GET, POST...)
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
