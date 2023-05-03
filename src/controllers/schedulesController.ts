import { Request, Response } from "express";
import { parseRKSIMobileSchedule } from "../services";
import { parseScheduleRKSI } from "../utils";
import config from "../constants/Config";

export class SchedulesController {
    public static async getRKSI(req: Request, res: Response): Promise<void> {
        try {
            const { group } = req.params;
            if (!group) {
                res.status(404).send("Такой группы нет");
                return;
            }
            const htmls = await parseRKSIMobileSchedule(config.RKSIUrl, group);
            const schedule = await parseScheduleRKSI(htmls);
            const formattedJSON = JSON.stringify(schedule, null, 2);
            res.status(200).send(`<pre>${formattedJSON}</pre>`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Ошибка сервера");
        }
    }
}