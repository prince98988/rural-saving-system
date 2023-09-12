export type Vehicle = {
    uid: string,
    timeStamp: string,
    vehicleType: string
}

export type WriterDashboardData = {
    bikeCount: number;
    carCount: number;
    logs: Vehicle[];
}