export type CalendarData = {
  weeks: CalendarWeek[];
  month: number;
  monthName: string;
  year: number;
};

export type CalendarWeek = CalendarDay[];

export type CalendarDay = {
  dayNumber: number;
  dayFormatted: string;
  weekdayName: string;
  withinMonth: boolean;
  events: CalendarEvent[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
};
