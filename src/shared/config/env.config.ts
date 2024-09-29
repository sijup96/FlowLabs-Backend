import "dotenv/config";
export const envConfig = {
  PORT: process.env.PORT || 3000,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRETKEY: process.env.JWT_SECRETKEY,
  ORIGIN_URL: process.env.ORIGIN_URL,
  EMAIL_USER_INFO_URI: process.env.EMAIL_USER_INFO_URI || '',
  ADMIN_DB_NAME: process.env.ADMIN_DB_NAME,
  TENANT_DB_NAME: process.env.TENANT_DB_NAME,
  DEFAULT_PASSWORD:process.env.DEFAULT_PASSWORD,
};
