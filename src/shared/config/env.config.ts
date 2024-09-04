import 'dotenv/config'
export const envConfig = {
    PORT: process.env.PORT || 3000,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    MONGODB_URI: process.env.MONGODB_URI
}