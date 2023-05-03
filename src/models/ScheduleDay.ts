import Lesson from "./Lesson";

interface ScheduleDay {
    fullDate: string;
    date: string;
    weekday: string;
    lessons: Lesson[];
}

export default ScheduleDay;