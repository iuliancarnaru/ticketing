import express from 'express';
import { json } from 'body-parser';

const PORT = 4000;
const app = express();
app.use(json());

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
