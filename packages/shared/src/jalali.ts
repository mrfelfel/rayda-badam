import moment from 'moment-jalaali';

export interface JalaliDate { year: number; month: number; day: number; week: number; dow: number; }

export function nowJalali(): JalaliDate {
  const m = moment();
  return { year: m.jYear(), month: m.jMonth()+1, day: m.jDate(), week: m.jWeek(), dow: m.jDay() };
}

export function formatJalali(date?: Date): string { return moment(date||new Date()).format('jYYYY/jMM/jDD HH:mm:ss'); }
export const DAY_NAMES = ['شنبه','یک شنبه','دوشنبه','سه شنبه','چهار شنبه','پنجشنبه','جمعه'];
export const MEAL_NAMES: Record<number,string> = {1:'ناهار',2:'شام',3:'سحری',4:'افطار'};
export function dayName(d: number): string { return DAY_NAMES[d]||''; }
export function mealName(c: number): string { return MEAL_NAMES[c]||''; }
export function detectMeal(h?: number): number {
  const hr = h??moment().hour();
  if(hr>=11&&hr<=14)return 1; if(hr>=17&&hr<=22)return 2; if(hr>=2&&hr<=5)return 3; return 0;
}
export function isTimeBlocked(py: number, pw: number, pd: number, c: JalaliDate): boolean {
  if(py<c.year)return true; if(py===c.year&&pw<c.week)return true; if(py===c.year&&pw===c.week&&c.dow>pd)return true; return false;
}
