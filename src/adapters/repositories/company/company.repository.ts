import ICompanyRepository from "../../../interface/company/ICompany.repository";
import { CompanyDbService } from '../../../frameworks/services/db.connection.service';
import { CompanyEntity } from "../../../entity/company.entity";
import { ICompanyDocument } from "../../../interface/company/ICompany.document";
import { CompanyModel } from "../../../frameworks/database/models/company.model";
import mongoose from "mongoose";


export class CompanyRepository implements ICompanyRepository{
    constructor(private companyDbService:CompanyDbService){
        this.companyDbService=companyDbService
    }
    public async save(CompanyData: CompanyEntity): Promise<void> {
        try {
            const dbName = CompanyData.email.split('@')[0];
            const connection = await this.companyDbService.getConnection(dbName)            
            const UserModel = connection.model<ICompanyDocument>('User',CompanyModel.schema)
            const newUser= await new UserModel(CompanyData).save()
        } catch (error) {
            throw error
        }
    }
    public async findByEmail(email: string): Promise<CompanyEntity | null> {
        try {
            const dbName = email.split('@')[0];
            const connection = await this.companyDbService.getConnection(dbName);
            const companyModel = connection.model<ICompanyDocument & mongoose.Document>('User', CompanyModel.schema);
            const companydata = await companyModel.findOne({ email: email }).exec();
            return companydata ? (companydata.toObject() as CompanyEntity) : null
        } catch (error) {
            throw error
        }
    }
}