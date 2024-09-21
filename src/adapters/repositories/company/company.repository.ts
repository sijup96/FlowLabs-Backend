import ICompanyRepository from "../../../interface/company/ICompany.repository";
import { CompanyDbService } from '../../../frameworks/services/db.connection.service';
import { CompanyEntity } from "../../../entity/company.entity";
import { ICompanyDocument } from "../../../interface/company/ICompany.document";
import { CompanyModel } from "../../../frameworks/database/models/company.model";
import mongoose, { Connection } from "mongoose";
import slugify from "slugify";


export class CompanyRepository implements ICompanyRepository {
    constructor(private companyDbService: CompanyDbService) {
        this.companyDbService = companyDbService
    }
    public async save(companyData: CompanyEntity): Promise<void> {
        try {
            const connection = await this.companyDbService.getConnection(companyData.companyName)
            const companyModel = connection?.model<ICompanyDocument>('CompanyData', CompanyModel.schema)
            companyModel && await new companyModel(companyData).save()
        } catch (error) {
            throw error
        }
    }
    public async findByCompanyName(companyName: string): Promise<CompanyEntity | null> {
        try {
            const domain = slugify(companyName).toUpperCase();
            const connection = await this.companyDbService.getConnection(domain);
            console.log('connection', connection);
            if (!connection) return null;
            const companyModel = connection?.model<ICompanyDocument & mongoose.Document>('Company', CompanyModel.schema);
            const companydata = await companyModel?.findOne({ companySlug: domain }).exec();
            return companydata ? companydata.toObject() as CompanyEntity : null;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    public async isExistingCompany(companyName: string): Promise<boolean> {
        try {
            return await this.companyDbService.checkExistingDb(companyName)
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}