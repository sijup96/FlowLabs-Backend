import { Connection } from "mongoose"
import { CompanyEntity } from "../../entity/company.entity"


interface ICompanyRepository {
    save(CompanyData: CompanyEntity): Promise<void>
    findByCompanyName(companyName: string): Promise<CompanyEntity | null>
    isExistingCompany(companyName: string): Promise<boolean>
}

export default ICompanyRepository