
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN',
  AREA_OFFICER = 'AREA_OFFICER',
  COOPERATIVE_REP = 'COOPERATIVE_REP'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  phoneNumber?: string;
}

export interface Department {
  id: string;
  stateName: string;
  directorName: string;
  address: string;
  createdAt: string;
  activeCooperatives: number;
}

export enum CooperativeType {
  AGRICULTURAL = 'Agricultural',
  THRIFT_LOANS = 'Thrift & Loans',
  CONSUMER = 'Consumer',
  MULTI_PURPOSE = 'Multi-Purpose',
  ARTISAN = 'Artisan'
}

export interface Trustee {
  name: string;
  position: string;
  passportUrl: string;
  phone: string;
}

export interface Cooperative {
  id: string;
  name: string;
  regNumber: string;
  type: CooperativeType;
  representativeName: string;
  email: string;
  phone: string;
  lga: string;
  membershipSize: number;
  status: 'PENDING' | 'VERIFIED' | 'CERTIFIED' | 'REVOKED';
  onboardedBy: string;
  departmentId: string;
  createdAt: string;
  // New Registration Fields
  memberListUrl?: string;
  minuteReportsUrl?: string;
  trustees?: Trustee[];
  corporateAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  requestLetterUrl?: string;
  physicalAddress?: string;
}

export interface Verification {
  id: string;
  cooperativeId: string;
  officerId: string;
  physicalSpaceConfirmed: boolean;
  membersConfirmed: boolean;
  notes: string;
  verifiedAt: string;
}

export interface TrainingMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'WORD' | 'YOUTUBE';
  url: string;
  uploadedBy: string;
  createdAt: string;
}

export interface EventAttendance {
  id: string;
  cooperativeId: string;
  officerId: string;
  eventType: 'AGM' | 'ELECTION' | 'INAUGURATION';
  eventDate: string;
  notes: string;
  attendedAt: string;
}

export interface FinancialReport {
  id: string;
  cooperativeId: string;
  year: number;
  reportUrl: string;
  uploadedBy: string;
  createdAt: string;
}

export interface TaxRecord {
  id: string;
  cooperativeId: string;
  amount: number;
  type: 'ANNUAL_LEVY' | 'REGISTRATION_FEE' | 'SPECIAL_ASSESSMENT';
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface Broadcast {
  id: string;
  title: string;
  content: string;
  targetType?: CooperativeType | 'ALL';
  sentBy: string;
  sentAt: string;
}
