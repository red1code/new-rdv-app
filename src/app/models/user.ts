export interface User {
  order?: number;
  uid: string;
  email: string;
  imageURL: string;
  created_at: any;
  firstName: string;
  familyName: string;
  phoneNumber: number;
  role: 'subscriber' | 'analyst' | 'editor' | 'admin';
}
