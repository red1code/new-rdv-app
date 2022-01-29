import { FirebaseError } from 'firebase/app';

export const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(0, i).toLocaleString('en', { month: 'short' })
);







/*

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(new Date().getFullYear()-1, i).toLocaleString('en', { year: 'numeric', month: 'short' })
);

*/
