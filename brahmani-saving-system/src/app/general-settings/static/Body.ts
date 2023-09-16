
export function LoginBodyRequest(email: string, password: string){
    return {
        email: email,
        password: password
    }
}
export function ReaderDashboardBodyRequest(timeStamp:string){
    return {
        timestamp: timeStamp
    }
}
export function CarEntryBodyRequest(){
    return {
        vehicleType: "Car"
    }
}

export function BikeEntryBodyRequest(){
    return {
        vehicleType: "Bike"
    }
}

export function DeleteEntryBodyRequest(timeStamp: string, vehicle: string){
    return {
        timeStamp: timeStamp,
        vehicle: vehicle
    }
}

export function AddEmployeeBodyRequest(email: string, name: string, type: string){
    return {
        email: email,
        name: name,
        type: type,
        password: 'Tavisca@1234'
    }
}

export function RemoveEmployeeBodyRequest(email: string){
    return {
        email: email
    }
}
export function UpdateUserCredentialsBodyRequest(email: string, password: string){
    return {
        email: email,
        password: password
    }
}