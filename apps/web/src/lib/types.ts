export type NameSpace = string;
export interface PlanSlot {
  dow: number;
  stringDate: string;
  food: { id: string; name: string };
  meal: { id: string; name: string };
  price: number;
  lock: boolean;
  place?: string;
}
export interface QueryGram { scope: string; address: string; info: { method: string; data?: Record<string, unknown> }; }
export interface DataGram { scope: string; address: string; type?: string; data?: Record<string, unknown>; }
