const ipAddress : string = "http://54.215.204.254:9042/";

export const reader_dashboard_details = ipAddress + 'Reader';

export const login_with_email_password= ipAddress +  'login/authenticate';

export const writer_dashboard_details = ipAddress +  'Writer/Write?count=5';
export const post_vehicle_entry = ipAddress +  'Writer/EnterVehicle';
export const delete_vehicle_entry = ipAddress +  'Writer/DeleteVehicle';
export const gel_all_vehicle_entry = ipAddress +  'Writer/GetAll';


export const add_New_employee = ipAddress +  'Admin/AddEmployee';
export const remove_employee = ipAddress +  'Admin/RemoveEmployee';
export const update_employee = ipAddress +  'Admin/UpdateEmployee';
export const get_all_employee = ipAddress +  'Admin/GetAllEmployee';