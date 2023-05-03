import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

export default app;