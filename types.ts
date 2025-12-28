
export type ViewType = 'home' | 'interested';

export interface Player {
  id: string;
  name: string;
  position: string;
  round: string;
  graduationYear?: number | string;
  clutchFactor: number;
  status: 'active' | 'inactive' | 'pending';
  needsRetest: boolean;
  lastTestedDate: string;
  isInterested?: boolean;
  fitScore?: number;
}

export enum PlayerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
