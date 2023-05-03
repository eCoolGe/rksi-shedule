import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cacheControl from 'express-cache-controller';

const app: Application = express();

// Задаем настройки cache-control middleware для всех маршрутов
app.use(cacheControl({
    maxAge: 3600 // Время в секундах, на которое кэшируется ответ сервера
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

export default app;