export interface Rendezvous {
  displayName: string;
  phoneNumber: string;
  createdAt: Date | string;
  createdBy: string;
  lastUpdate?: Date | string;
  order?: number;
  rdvID?: string;
  rdvState: RendezvousStates;

  approvedAt?: Date | string;
  approvedBy?: string;
  rdvDate?: Date | string;

  finishedAt?: Date | string;

  canceledAt?: Date | string;
  canceledBy?: string;

  deletedAt?: Date | string;
  deletedBy?: string;
}

export enum RendezvousStates {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
}
