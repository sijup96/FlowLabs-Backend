import { CompanyDbService } from "../../../frameworks/services/db.connection.service";
import { CompanyEntity } from "../../../entity/company.entity";
import { ICompanyDocument } from "../../../interface/company/ICompany.document";
import { CompanyModel } from "../../../frameworks/database/models/company.model";
import mongoose, { Connection } from "mongoose";
import slugify from "slugify";
import { ObjectId } from "mongodb";
import {
  ICompanyRepository,
  ILoginProps,
} from "../../../interface/company/ICompany.repository";
import { COLLECTION_NAME } from "../../../shared/constants";
import bcrypt from "bcrypt";
import { IPayload } from "../../../interface/service/I_jwtService";
import { ICompanyUpdateProps } from "../../../interface/company/ICompany.useCase";

export class CompanyRepository implements ICompanyRepository {
  private collectionName = COLLECTION_NAME.company;
  constructor(private companyDbService: CompanyDbService) {
    this.companyDbService = companyDbService;
  }
  public async save(companyData: CompanyEntity): Promise<void> {
    try {
      const connection = await this.companyDbService.getConnection(
        companyData.companyName
      );
      const companyModel = connection?.model<ICompanyDocument>(
        "CompanyData",
        CompanyModel.schema
      );
      companyModel && (await new companyModel(companyData).save());
    } catch (error) {
      throw error;
    }
  }
  public async findByCompanyName(
    companyName: string
  ): Promise<CompanyEntity | null> {
    try {
      const domain = slugify(companyName).toUpperCase();
      const connection = await this.companyDbService.getConnection(domain);
      if (!connection) return null;
      const companyModel = connection?.model<
        ICompanyDocument & mongoose.Document
      >("Company", CompanyModel.schema);
      const companydata = await companyModel
        ?.findOne({ companySlug: domain })
        .exec();
      return companydata ? (companydata.toObject() as CompanyEntity) : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async isExistingCompany(companyName: string): Promise<boolean> {
    try {
      return await this.companyDbService.checkExistingDb(companyName);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async login(
    connection: Connection,
    body: ILoginProps
  ): Promise<ICompanyDocument | null> {
    try {
      const collection = connection.collection(this.collectionName);
      const data = await collection.findOne({ email: body.email });
      if (!data) return null;
      const isPasswordValid = await bcrypt.compare(
        body.password,
        data.password
      );
      return isPasswordValid ? (data as ICompanyDocument) : null;
    } catch (error) {
      throw error;
    }
  }
  public async resetPassword(
    connection: Connection,
    body: { hashedPassword: string; userId: string }
  ): Promise<void> {
    try {
      const collection = connection.collection(this.collectionName);
      const userId = new ObjectId(body.userId);
      await collection.findOneAndUpdate(
        { _id: userId },
        { $set: { password: body.hashedPassword } }
      );
    } catch (error) {
      throw error;
    }
  }
  public async getCompanyInfo(
    connection: Connection,
    userId: string
  ): Promise<ICompanyDocument> {
    try {
      const collection = connection.collection(this.collectionName);
      const id = new ObjectId(userId);
      const companyData = await collection.findOne(
        { _id: id },
        { projection: { password: 0 } }
      );
      return companyData as ICompanyDocument;
    } catch (error) {
      throw error;
    }
  }
  public async updateCompanyInfo(
    connection: Connection,
    body: ICompanyUpdateProps,
    user: IPayload
  ): Promise<void> {
    try {
      const updateData: Partial<ICompanyUpdateProps> = { ...body };
      const collection = connection.collection(this.collectionName);
      const userId = new ObjectId(user.userId);
      await collection.findOneAndUpdate({ _id: userId }, { $set: updateData });
    } catch (error) {
      throw error;
    }
  }
  public async updateCompanyLogo(connection:Connection,imageUrl:string,user:IPayload):Promise<void>{
    try {
      const collection=connection.collection(this.collectionName)
      const userId=new ObjectId(user.userId);
      await collection.findOneAndUpdate({_id:userId},{$set:{logo:imageUrl}})
    } catch (error) {
      throw error
    }
  }
}
