import nodemailer from 'nodemailer';
import { IEmailOptions } from '../../interface/company/IEmailOptions';



export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
    }
    public async sendMail(emailOptions:IEmailOptions): Promise<void> {
        const { to, subject, body } = emailOptions
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: body,
        })
    }
}