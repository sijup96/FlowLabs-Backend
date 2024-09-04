import { CompanyEntity } from "../../entity/company.entity"


interface ICompanyRepository{
    save(CompanyData:CompanyEntity):Promise<void>
    findByEmail(email:string):Promise<CompanyEntity | null>
}

export default ICompanyRepository