import { Model, Connection } from "mongoose";
import { ITenantDocument } from "../../interface/company/ITenant.document";
import { ITenantInfo } from "../../interface/company/ITenant.info";
import { CompanySchema } from "../database/models/company.model";
import { UserSchema } from "../database/models/employeeModel";

export class TenantService {
    constructor(private tenantModel: Model<ITenantDocument>, private connection: Connection) {}

    public async createTenant(data:ITenantDocument):Promise<void>{
        
    }
    // async getAllTenants(): Promise<ITenantInfo[]> {
    //     try {
    //         return await this.tenantModel.find().lean();
    //     } catch (error) {
    //         console.error('Failed to get tenants:', error);
    //         throw error;
    //     }
    // }

    // async createTenant(tenantData: Partial<ITenantDocument>, userData: { email: string, password: string }): Promise<ITenantDocument> {
    //     let session;
    //     try {
    //         // Start a session to ensure the creation of tenant and user is atomic.
    //         session = await this.connection.startSession();
    //         session.startTransaction();

    //         // Create and save the tenant document.
    //         const newTenant = new this.tenantModel(tenantData);
    //         await newTenant.save({ session });

    //         // Create new tenant database and initialize models.
    //         const tenantDb = this.connection.useDb(newTenant.tenantId, { useCache: true });
    //         const userModel = tenantDb.models.User || tenantDb.model('User', UserSchema);
    //         const companyModel = tenantDb.models.Company || tenantDb.model('Company', CompanySchema);
    //         // Create the admin user within the tenant's database.
    //         await userModel.create([{
    //             email: userData.email,
    //             password: userData.password,
    //             role: 'admin',
    //         }], { session });

    //         await session.commitTransaction();
    //         console.log(`Tenant ${newTenant.tenantId} created successfully with database tenant_${newTenant.tenantId}`);
    //         return newTenant;
    //     } catch (error) {
    //         // Abort the transaction if an error occurs.
    //         if (session) {
    //             await session.abortTransaction();
    //         }
    //         console.error('Failed to create tenant:', error);
    //         throw new Error('Failed to create tenant');
    //     } finally {
    //         // End the session to free up resources.
    //         if (session) {
    //             session.endSession();
    //         }
    //     }
    // }

    // async getTenantById(tenantId: string): Promise<ITenantDocument | null> {
    //     try {
    //         return await this.tenantModel.findOne({ tenantId }).exec();
    //     } catch (error) {
    //         console.error('Error fetching tenant by ID:', error);
    //         throw new Error('Failed to get tenant by ID');
    //     }
    // }

    // async getTenantDatabase(tenantId: string, domain: string): Promise<Connection> {
    //     try {
    //         const tenant = await this.tenantModel.findOne({ tenantId, domain }).exec();
    //         if (!tenant) {
    //             throw new Error('Tenant not found');
    //         }
    //         return this.connection.useDb(tenant.tenantId, { useCache: true });
    //     } catch (error) {
    //         console.error('Error getting tenant database:', error);
    //         throw new Error('Failed to get tenant database');
    //     }
    // }

    // async checkTenantDatabase(domain: string): Promise<Connection | null> {
    //     try {
    //         const tenant = await this.tenantModel.findOne({ domain }).exec();
    //         if (!tenant) {
    //             return null;
    //         }
    //         return this.connection.useDb(tenant.tenantId, { useCache: true });
    //     } catch (error) {
    //         console.error('Error checking tenant database:', error);
    //         throw new Error('Failed to check tenant database');
    //     }
    // }
}
