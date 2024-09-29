import { Schema, model } from 'mongoose';
import { ITenantDocument } from '../../../interface/company/ITenant.document';



// Tenant schema
const TenantSchema = new Schema<ITenantDocument>({
  email: { type: String, required: true },
  dbName: { type: String, required: true },
  password:{type:String}
});

export const Tenant = model<ITenantDocument>('Tenant', TenantSchema);