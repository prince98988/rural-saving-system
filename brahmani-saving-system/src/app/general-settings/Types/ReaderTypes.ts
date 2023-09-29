export interface NextFifteenMinutes {
  timeStamp: Date;
  bikeCount: number;
  carCount: number;
}

export interface NextThirtyMinutes {
  timeStamp: Date;
  bikeCount: number;
  carCount: number;
}

export interface NextOneHour {
  timeStamp: Date;
  bikeCount: number;
  carCount: number;
}

export interface MemberData {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Role: string;
  Shares: number;
  PhoneNumber: string;
  PremiumPaid: number;
  LoanAmount: number;
  PenaltyPaid: number;
  InterestPaid: number;
  NextMonthPremium: number;
  NextMonthInterest: number;
}

export interface AssociationData {
  Name: string;
  DefaultPassword: string;
  PresidentName: string;
  Shares: number;
  TotalBalance: number;
  LoanAmount: number;
  ToalMembers: number;
  InterestRate: number;
  SharePrice: number;
  AvailableBalance: number;
}

export interface UserMonthlyData {
  PhoneNumber: string;
  Premium: number;
  PremiumStatus: boolean;
  LoanAmount: number;
  InterestAmount: number;
  InterestStatus: boolean;
  PenaltyPaid: number;
  DateTime: Date;
}
