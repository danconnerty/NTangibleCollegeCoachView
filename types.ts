
export type ViewType = 'home' | 'interested' | 'coaches-nterpret' | 'my-profile';

export type PlayerLevel = 'High School' | 'NCAA' | 'JUCO' | 'PRO';

export interface Player {
  id: string;
  name: string;
  position: string;
  level: PlayerLevel;
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
