import { FirebaseError } from 'firebase/app';
import { THEMES } from '../models/user';

export const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';

export async function dataUrlToFile(dataUrl: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], `${Date.now()}`, { type: 'image/png' });
}

export function timeTolocalISOstring(date: Date): string {
  return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2)) + 'T' + date.toTimeString().slice(0, 5)
}

export function setTheme(theme: THEMES) {
  const root = <HTMLElement>document.querySelector(':root');
  if (theme === THEMES.DARK) {
    root.style.setProperty('--font-color', 'rgba(100%, 100%, 100%, 87%)');
    root.style.setProperty('--header-font', 'rgba(100%, 100%, 100%, 87%)');
    root.style.setProperty('--template-bg-color', '#121212');
    root.style.setProperty('--popup-bg-color', '#000000');
    root.style.setProperty('--body-bg-color', '#000000');
    root.style.setProperty('--mainToSide-color', '#ecf39e');
    root.style.setProperty('--overlay-color', '#ffffff');
  } else { // set light
    root.style.setProperty('--font-color', '#121212');
    root.style.setProperty('--header-font', '#ffffff');
    root.style.setProperty('--template-bg-color', '#ffffff');
    root.style.setProperty('--popup-bg-color', '#ffffff');
    root.style.setProperty('--body-bg-color', '#ebebeb');
    root.style.setProperty('--mainToSide-color', '#191970');
    root.style.setProperty('--overlay-color', '#000000');
  }
}



/*

export const Months: string[] = Array.from({ length: 12 }, (item, i) =>
  new Date(new Date().getFullYear()-1, i).toLocaleString('en', { year: 'numeric', month: 'short' })
);

*/
