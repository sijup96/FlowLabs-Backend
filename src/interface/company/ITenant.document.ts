export interface ITenantDocument extends Document {
  email: string;
  dbName: string;
  password: string;
}
