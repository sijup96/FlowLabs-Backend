import mongoose, { Schema } from 'mongoose';
import { IEmployeeDocument } from '../../../interface/employee/I_employeeDocument';

// User Schema
export const EmployeeSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hireDate: {
      type: Date,
    },
    joiningDate: {
      type: Date,
    },
    basicSalary: {
      type: Number,
    },
    employeeType: {
      type: String,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    designationId: {
      type: Schema.Types.ObjectId,
      ref: 'Designation',
    },
    workShift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkShift',
    },
    employeeId: {
      type: String,
    },
    status: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    allowances: [{ name: String, amount: Number }],
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const EmployeeModel = mongoose.model<IEmployeeDocument>('Employee', EmployeeSchema);
export default EmployeeModel;