import { CustomError } from "../shared/utils/customError";
import { validate } from "../shared/utils/validation";

export class ProjectEntity {
  constructor(
    private name: string,
    private slug:string,
    private description: string,
    private assignedTo: string[],
    private startDate: Date,
    private endDate: Date,
    private priority: string,
    private status: string,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {}
  validateData(): void {
    const errorObject: { [key: string]: string } = {};
    // Validate startDate and endDate
    if (this.startDate >= this.endDate)
      errorObject.startDateError = "Start date must be earlier than end date.";
    // Validate name
    if (!validate.fullName(this.name))
      errorObject.nameError = "Invalid name provided.";
    // Validate description
    // if (!validate.projectDescription(this.description))
    //   errorObject.descriptionError = "Invalid description provided.";
    // Validate status (Pending, InProgress, Completed)
    const validStatuses = ["Pending", "InProgress", "Completed"];
    if (!validStatuses.includes(this.status))
      errorObject.statusError =
        "Status must be Pending, InProgress, or Completed.";

    // Log errors and throw validation error if any
    if (Object.keys(errorObject).length > 0) {
      throw new CustomError("Validation Error", errorObject, 400);
    }
  }
}
