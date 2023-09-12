export type Employee = {
    email: string;
    password?: any;
    empType: string;
    timeStamp: Date;
    name: string;
}

export type EmployeeResponseArray = Array<Employee>