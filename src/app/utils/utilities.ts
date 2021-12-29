import { FirebaseError } from 'firebase/app';

export const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';
