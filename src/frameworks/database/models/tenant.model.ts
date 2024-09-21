import { Schema, model } from 'mongoose';
import { ITenantDocument } from '../../../interface/company/ITenant.document';



// Tenant schema
const TenantSchema = new Schema<ITenantDocument>({
  domain: { type: String, required: true },
  tenantId: { type: String, required: true },
});

export const Tenant = model<ITenantDocument>('Tenant', TenantSchema);