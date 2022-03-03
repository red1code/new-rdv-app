import { TablesCols } from "../models/tablesCols";

const lang = localStorage.getItem('language') || 'en';

export function getUsersCols(): TablesCols[] {
  if (lang === 'ar') return [
    { title: 'الاِسم', data: 'firstName' },
    { title: 'اللقب', data: 'lastName' },
    { title: 'رقم الهاتف', data: 'phoneNumber' },
    { title: 'البريد الالكتروني', data: 'email' },
    { title: 'أُنشئَ في', data: 'created_at' },
    { title: 'الدور', data: 'role' }
  ];
  if (lang === 'fr') return [
    { title: 'Prénom', data: 'firstName' },
    { title: 'Nom', data: 'lastName' },
    { title: 'Numéro De Tél', data: 'phoneNumber' },
    { title: 'E-mail', data: 'email' },
    { title: 'Créé À', data: 'created_at' },
    { title: 'Rôle', data: 'role' }
  ];
  return [
    { title: 'First Name', data: 'firstName' },
    { title: 'Last Name', data: 'lastName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Email', data: 'email' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Role', data: 'role' }
  ]
}

export function getPendingRDVsCols(): TablesCols[] {
  if (lang === 'ar') return [
    { title: 'الترتيب', data: 'order' },
    { title: 'الاِسم', data: 'displayName' },
    { title: 'رقم الهاتف', data: 'phoneNumber' },
    { title: 'أُنشئَ في', data: 'createdAt' },
    { title: 'آخر تحديث', data: 'lastUpdate' }
  ];
  if (lang === 'fr') return [
    { title: 'Classement', data: 'order' },
    { title: 'Nom Affiché', data: 'displayName' },
    { title: 'Numéro De Tél', data: 'phoneNumber' },
    { title: 'Créé À', data: 'createdAt' },
    { title: 'Dernière Mise A Jour', data: 'lastUpdate' }
  ];
  return [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' }
  ]
}

export function getApprovedRDVsCols(): TablesCols[] {
  if (lang === 'ar') return [
    { title: 'الترتيب', data: 'order' },
    { title: 'الاِسم', data: 'displayName' },
    { title: 'رقم الهاتف', data: 'phoneNumber' },
    { title: 'أُنشئَ في', data: 'createdAt' },
    { title: 'آخر تحديث', data: 'lastUpdate' },
    { title: 'تاريخ الموعد', data: 'rdvDate' }
  ];
  if (lang === 'fr') return [
    { title: 'Classement', data: 'order' },
    { title: 'Nom Affiché', data: 'displayName' },
    { title: 'Numéro De Tél', data: 'phoneNumber' },
    { title: 'Créé À', data: 'createdAt' },
    { title: 'Dernière Mise A Jour', data: 'lastUpdate' },
    { title: 'Date De Rendez-vous', data: 'rdvDate' }
  ];
  return [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' },
    { title: 'Rendezvous Date', data: 'rdvDate' }
  ]
}
