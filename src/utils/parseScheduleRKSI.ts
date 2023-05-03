import {ScheduleDay} from "../models";

async function parseScheduleRKSI(htmls: string[]): Promise<ScheduleDay[]> {
    const schedule: ScheduleDay[] = [];
    let currentDay: ScheduleDay | null = null;

    for (const html of htmls) {
        if (html.startsWith('<b>')) {
            const date = html.replace('<b>', '').replace('</b>', '');
            currentDay = {date, lessons: []};
            schedule.push(currentDay);
        } else if (currentDay) {
            const lessonHtml = html.replace('<p>', '').replace('</p>', '');
            const [time, subjectHtml, teacherClassroom] = lessonHtml.includes('<br>') ? lessonHtml.split('<br>') : [lessonHtml];
            const [teacher, classroom] = teacherClassroom ? teacherClassroom.split(', ауд. ') : ['', ''];

            if (time !== '<hr>') {
                const subject = subjectHtml.replace(/<\/?[^>]+(>|$)/g, '');
                currentDay.lessons.push({time, subject, teacher, classroom});
            }
        }
    }
    return schedule;
}

export default parseScheduleRKSI;