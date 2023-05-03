import express, {NextFunction, Request, Response} from 'express';
import app from "./app";
import indexRouter from "./controllers";
import config from "./constants/Config";

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('Тут ничего нет :с');
});
app.use('/', indexRouter);

// Server start
const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
