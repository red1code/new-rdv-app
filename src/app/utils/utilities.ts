import { Rendezvous } from './../models/rendezvous';
import { FirebaseError } from 'firebase/app';

const lang = localStorage.getItem('language') || 'en';

export const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(0, i).toLocaleString('en', { month: 'short' })
);

export async function dataUrlToFile(dataUrl: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], `${Date.now()}`, { type: 'image/png' });
}

export function timeTolocalISOstring(date: Date): string {
  return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2)) + 'T' + date.toTimeString().slice(0, 5)
}

export function getDeleteConfirmMsg(rdv: Rendezvous): string {
  const ArMsg = `هل أنت متأكد من حذف هذا الموعد ؟
  - الاسم : ${rdv?.displayName}
  - أُنشئَ في : ${rdv?.createdAt}
  `;
  const FrMsg = `Êtes-vous sûr de vouloir Supprimer ce rendez-vous ?
  - Nom : ${rdv?.displayName}
  - Créé À : ${rdv?.createdAt}
  `;
  const EngMsg = `Are you sure You want to Delete this Rendezvous?
  - Name: ${rdv?.displayName}
  - Created At: ${rdv?.createdAt}
  `;

  if (lang === 'ar') return ArMsg;
  if (lang === 'fr') return FrMsg;
  return EngMsg
}

export function getCancelConfirmMsg(rdv: Rendezvous): string {
  const ArMsg = `هل أنت متأكد من إلغاء هذا الموعد ؟
  - الاسم : ${rdv?.displayName}
  - أُنشئَ في : ${rdv?.createdAt}
  `;
  const FrMsg = `Êtes-vous sûr de vouloir Annuler ce rendez-vous ?
  - Nom : ${rdv?.displayName}
  - Créé À : ${rdv?.createdAt}
  `;
  const EngMsg = `Are you sure You want to Cancel this Rendezvous?
  - Name: ${rdv?.displayName}
  - Created At: ${rdv?.createdAt}
  `;

  if (lang === 'ar') return ArMsg;
  if (lang === 'fr') return FrMsg;
  return EngMsg
}







/*

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(new Date().getFullYear()-1, i).toLocaleString('en', { year: 'numeric', month: 'short' })
);

*/
