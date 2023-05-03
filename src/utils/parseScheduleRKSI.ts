import {ScheduleDay} from "../models";
import {format, parse} from 'date-fns';
import {ru} from "date-fns/locale";
import {capitalize} from "./index";

async function parseScheduleRKSI(htmls: string[]): Promise<ScheduleDay[]> {
    const schedule: ScheduleDay[] = [];
    let currentDay: ScheduleDay | null = null;

    for (const html of htmls) {
        if (html.startsWith('<b>')) {
            const date = html.replace('<b>', '').replace('</b>', '');
            const parsedDate = parse(date, 'd MMMM, EEEE', new Date(), {locale: ru});
            const fullDate = format(parsedDate, 'dd.MM.yyyy');
            const weekday = capitalize(format(parsedDate, 'EEEE', {locale: ru}));
            currentDay = {fullDate, date, weekday, lessons: []};
            schedule.push(currentDay);
        } else if (currentDay) {
            const lessonHtml = html.replace('<p>', '').replace('</p>', '');
            const [time, subjectHtml, teacherClassroom] = lessonHtml.includes('<br>') ? lessonHtml.split('<br>') : [lessonHtml];
            const [teacher, classroom] = teacherClassroom ? teacherClassroom.split(', ауд. ') : ['', ''];

            if (time !== '<hr>') {
                const subject = subjectHtml.replace(/<\/?[^>]+(>|$)/g, '');
                currentDay.lessons.push({time: time.replace(/\s+/g, ' '), subject, teacher, classroom});
            }
        }
    }
    return schedule;
}

export default parseScheduleRKSI;