export interface Rendezvous {
  displayName: string;
  phoneNumber: string;
  created_by: string;
  created_at: Date | string;
  lastUpdate: Date | string;
  order?: number;
  rdvID?: string;
}

export interface ApprovedRendezvous {
  displayName: string;
  phoneNumber: string;
  created_by: string;
  created_at: Date | string;
  lastUpdate: Date | string;
  order?: number;
  rdvID?: string;
  approvedBy: string;
  approvedAt: Date | string;
  rdvDate: Date | string;
}
