import { Document } from 'mongoose';

export interface IEmployeeDocument extends Document {
    firstName: string;
    lastName:string;
    role: string; 
    password: string;
    email: string;
    gender: string;
    dob: Date;
    streetAddress: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
    hireDate: Date;
    joiningDate: Date;
    basicSalary: number;
    employeeType: string;
    employeeId: string;
    status: string;
    departmentId?: string; 
    designationId?: string; 
    workShift?: string; 
    allowances?: Array<{ name: string; amount: number }>;
    profilePic?: string;
    createdAt?: Date; 
    updatedAt?: Date;
}
