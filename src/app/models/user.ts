import { LANGUAGES } from "./languages";

export interface User {
  order?: number;
  uid?: string;
  email?: string | null;
  imageURL: string;
  created_at: any;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number | null;
  role: ROLES;
  language?: LANGUAGES;
  darkTheme?: boolean;
}

export enum ROLES {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  PATIENT = 'PATIENT',
  MEDECIN = 'MEDECIN'
}

export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light;'
}
