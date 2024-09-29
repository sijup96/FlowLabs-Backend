import { AdminDbService } from "../../../frameworks/services/db.connection.service"
import { IAdminRepository } from "../../../interface/admin/IAdmin.repository";
import { COLLECTION_NAME } from "../../../shared/constants";




export class AdminRepository implements IAdminRepository {
    private collectionName = COLLECTION_NAME.admin;
    constructor(private adminDbService: AdminDbService) {
        this.adminDbService = adminDbService
    }
    public async verifyAdmin(email: string, password: string): Promise<{_id:string,email:string}> {
        try {
            const connection = await this.adminDbService.getConnection();
            if (!connection) throw new Error('connection not getting')
            const adminCollection = connection.collection(this.collectionName)
            const admin = await adminCollection.findOne({ email })
            if (!admin) throw new Error('Admin not found')
            if (password !== admin.password) throw new Error('Invalid Credentials')
            return {_id:admin._id.toString(),email:admin.email}
        } catch (error) {
            throw error
        }
    }
}