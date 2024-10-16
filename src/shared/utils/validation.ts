import { ICompanyUpdateProps } from "../../interface/company/ICompany.useCase";
import { IEmployeeDocument } from "../../interface/employee/I_employeeDocument";

export const validateFields = (body: ICompanyUpdateProps) => {
  const errors: { [key: string]: string } = {};
  let isValid = true;
  if (body.phone && !/^\d{10}$/.test(body.phone)) {
    errors.phoneError = "Invalid phone number";
    isValid = false;
  }
  if (body.description && body.description.length > 1000) {
    errors.descriptionError = "Description must be less than 1000 characters";
    isValid = false;
  }
  if (body.foundedDate) {
    const foundedDate = new Date(body.foundedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    foundedDate.setHours(0, 0, 0, 0);
    console.log(foundedDate,today)
    if (isNaN(foundedDate.getTime())) {
      errors.foundedDateError = "Invalid founded date";
      isValid = false;
    } else if (foundedDate > today) {
      errors.foundedDateError = "Founded date must be in the past";
      isValid = false;
    }
  }
  return { errors, isValid };
};

export const validateEmployee=(data:IEmployeeDocument)=>{
  const regexMap = {
    firstName: /^[A-Z][a-zA-Z\s]*$/,
    lastName: /^[A-Z][a-zA-Z\s]*$/,
    role: /^[A-Za-z0-9 _-]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    gender: /^(male|female|other)$/,
    dob: /^\d{4}-\d{2}-\d{2}$/,
    streetAddress: /^[A-Za-z0-9\s.,#-]+$/,
    city: /^[A-Z][a-zA-Z\s]*$/,
    country: /^[A-Z][a-zA-Z\s]*$/,
    postalCode: /^[A-Za-z0-9\s-]+$/,
    phone: /^\d{10}$/,
    hireDate: /^\d{4}-\d{2}-\d{2}$/,
    joiningDate: /^\d{4}-\d{2}-\d{2}$/,
    basicSalary: /^(?!0\.00)\d+(\.\d{1,2})?$/,
    employeeType: /^[A-Za-z0-9 _-]+$/,
    employeeId: /^[A-Za-z0-9_-]+$/,
    status: /^(active|inactive)$/,
    departmentId: /^[A-Za-z0-9_-]*$/,
    designationId: /^[A-Za-z0-9_-]*$/,
    workShift: /^(morning|evening|night)$/,
    allowances: /^[A-Za-z\s]+$/,
  };
  // return regexMap[fieldName]?.test(value) || false;
}