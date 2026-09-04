export const DAY_NAMES = ['شنبه','یک شنبه','دوشنبه','سه شنبه','چهار شنبه','پنجشنبه','جمعه'];
export const MEAL_NAMES: Record<number, string> = { 1:'ناهار', 2:'شام', 3:'سحری', 4:'افطار' };
export function dayName(d: number): string { return DAY_NAMES[d] || ''; }
export function mealName(c: number): string { return MEAL_NAMES[c] || ''; }
export function detectMeal(h?: number): number {
  const hr = h ?? new Date().getHours();
  if (hr >= 11 && hr <= 14) return 1;
  if (hr >= 17 && hr <= 22) return 2;
  if (hr >= 2 && hr <= 5) return 3;
  return 0;
}
