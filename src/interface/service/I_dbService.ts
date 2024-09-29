import { Connection } from "mongoose";

export interface ICompanyDbService {
  getConnection(domain: string): Promise<Connection | null>;
  checkExistingDb(companyName: string): Promise<boolean>;
}
