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

export interface ReaderDashboardData {
  nextFifteenMinutes: NextFifteenMinutes;
  nextThirtyMinutes: NextThirtyMinutes;
  nextOneHour: NextOneHour;
  bikeSafeTime: string;
  carSafeTime: string;
  currentBikeCount: number;
  currentCarCount: number;
}
