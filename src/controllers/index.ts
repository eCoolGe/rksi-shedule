import express, {NextFunction, Request, Response} from 'express';
import { SchedulesController } from './schedulesController';
import config from "../constants/Config";

const router = express.Router();

// Роуты для пользователя
router.get('/schedule', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(`Тут лежит динамический API для сайта ${config.RKSIUrl} - надо только ввести название группы в поисковую строку за /`);
});
router.get('/schedule/:group', SchedulesController.getRKSI.bind(SchedulesController));

export default router;