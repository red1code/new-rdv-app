export interface Rendezvous {
  displayName: string;
  phoneNumber: string;
  created_by: string;
  created_at: Date | string;
  lastUpdate: Date | string;
  rdvState: RendezvousStates;
  approvedAt?: Date | string;
  approvedBy?: string;
  rdvDate?: Date | string;
  order?: number;
  rdvID?: string;
}

export enum RendezvousStates {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
}
