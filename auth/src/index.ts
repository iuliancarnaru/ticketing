import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';

const PORT = 4000;
const app = express();
app.use(json());

app.use(currentUserRouter);

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
