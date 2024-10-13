export class Claim {
  idClaim!: number;
  decision!: string;
  date!: Date; // Using Date type for date property
  subject!: string;
  status!: string;
  description!: string;
  level!: number;
  title?: ClaimType; // Optional property for claim type
  systemProblem?: SystemProb; // Optional property for system problem
  serviceProblem?: ServiceProb; // Optional property for service problem
}

// Enum definitions
export enum ClaimType {
  SYSTEM = 'SYSTEM',
  SERVICE = 'SERVICE',
  OTHER = 'OTHER',
}

export enum SystemProb {
  SERVER = 'SERVER',
  OPERATIONAL_MALFUNCTION = 'OPERATIONAL_MALFUNCTION',
  UNCORRECT_TIMING = 'UNCORRECT_TIMING',
}

export enum ServiceProb {
  STAFF_SHORTAGE = 'STAFF_SHORTAGE',
  DESORGANISATION = 'DESORGANISATION',
}
