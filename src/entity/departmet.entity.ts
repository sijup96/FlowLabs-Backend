export class DepartmentEntity {
  constructor(
    private departmentName: string,
    private slug: string,
    private description: string,
    private status: string,
    private updatedAt: Date = new Date(),
    private createdAt: Date = new Date()
  ) {}
}
