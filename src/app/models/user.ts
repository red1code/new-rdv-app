export interface User {
  order?: number;
  uid?: string;
  email: string;
  imageURL: string;
  created_at: any;
  firstName: string;
  familyName: string;
  phoneNumber: number;
  role: Roles;
}

export enum Roles {
  subscriber = 'Subscriber',
  analyst = 'Analyst',
  editor = 'Editor',
  admin = 'Admin'
}
