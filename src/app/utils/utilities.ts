import { FirebaseError } from 'firebase/app';

export const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(0, i).toLocaleString('en', { month: 'short' })
);







export function timeTolocalISOstring(date: Date): string {
  return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2)) + 'T' + date.toTimeString().slice(0, 5)
}





/*

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(new Date().getFullYear()-1, i).toLocaleString('en', { year: 'numeric', month: 'short' })
);

*/
