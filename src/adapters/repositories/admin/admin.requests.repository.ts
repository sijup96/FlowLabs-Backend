import {
  AdminDbService,
  CompanyDbService,
} from "../../../frameworks/services/db.connection.service";
import { IRequestApprovelProps } from "../../../interface/admin/IAdmin.useCase";

export class AdminRequestsRepository {
  constructor(
    private adminDbService: AdminDbService,
    private companyDbService: CompanyDbService
  ) {
    this.adminDbService = adminDbService;
  }
  public async getUnapprovedCompanies() {
    try {
      const companies = await this.adminDbService.getAllCompanies();
      if (!companies) return null;
      const unapprovedCompanies: Record<string, unknown[]> = {};
      for (const [dbName, companyList] of Object.entries(companies)) {
        const unapprovedIndb = companyList.filter(
          (company) => company.isApproved === "pending"
        );
        if (unapprovedIndb.length > 0)
          unapprovedCompanies[dbName] = unapprovedIndb;
      }
      return Object.keys(unapprovedCompanies).length > 0
        ? unapprovedCompanies
        : null;
    } catch (error) {
      throw error;
    }
  }
  public async requestApprovel(data: IRequestApprovelProps) {
    try {
      const connection = await this.companyDbService.getConnection(
        data.companySlug
      );
      if (!connection) throw new Error("Connection is not getting..");
      const collection = connection.collection("companydatas");
      const companyData = await collection.findOne({
        companySlug: data.companySlug,
      });
      if (!companyData) throw new Error("Company data is not found");
      if (data.isApproved) {
        const updatedData = { $set: { isApproved: "approved" } };
        const updated = await collection.updateOne(
          { companySlug: data.companySlug },
          updatedData
        );
        return {
          email: companyData.email,
          companyName: companyData.companyName,
          isApproved: true,
        };
      } else {
        const updatedData = { $set: { isApproved: "declined" } };
        await collection.updateOne(
          { companySlug: data.companySlug },
          updatedData
        );
        return {
          email: companyData.email,
          companyName: companyData.companyName,
          isApproved: false,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
