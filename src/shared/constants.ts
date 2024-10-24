export const SIGNUP_EMAIL_BODY = () => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Thank You for Joining FlowLabs!</h2>
    <p>Hello,</p>
    <p>We’re excited to have you on board! Your request to join FlowLabs has been received and is currently under review by our team.</p>
    
    <p>Once your company is approved, we will send you the login details so that you can access your FlowLabs account and start using our services.</p>
    
    <p>If you have any questions in the meantime, feel free to reach out to us. We’ll keep you updated on the approval process.</p>
    
    <p>Best regards,</p>
    <p>The FlowLabs Team</p>
</div>
`;
};
export const APPROVED_EMAIL_BODY = (
  companySlug: string,
  companyName: string,
  defaultPassword: string
) => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Congratulations, Your Company is Approved!</h2>
    <p>Hello,</p>
    <p>We are excited to inform you that your company <strong>${companyName}</strong> has been approved. You can now log in and start using FlowLabs to manage your HR and business operations.</p>
    
    <p><strong>Your temporary login password is: <span style="color: #ff0000;">${defaultPassword}</span></strong></p>
    <p>Please use the button below to log in and change your password after your first login.</p>
    
    <a href="http://localhost:5173/c/${companySlug}/login" target="_blank" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Log In to FlowLabs</a>
    
    <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
    <p><a href="http://localhost:5173/c/${companySlug}/login" target="_blank">http://localhost:5173/c/${companySlug}/login</a></p>
    
    <p>For your security, make sure to change your password immediately after logging in.</p>
    
    <p>We're here to help if you have any questions. Welcome to the FlowLabs community!</p>
    <p>Best regards,</p>
    <p>The FlowLabs Team</p>
</div>
`;
};
export const DECLINE_EMAIL_BODY = (companyName: string) => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #FF0000;">Company Registration Request Update</h2>
    <p>Dear ${companyName} team,</p>
    
    <p>Thank you for your interest in joining FlowLabs. After carefully reviewing your company’s registration request, we regret to inform you that we are unable to approve your registration at this time.</p>
    
    <p>This decision is based on certain eligibility requirements not being met. However, if you feel that this decision may have been made in error, or if you would like to discuss further, we encourage you to contact our support team for clarification.</p>
    
    <p>Your interest in FlowLabs is greatly appreciated, and we hope to have the opportunity to work with you in the future.</p>
    
    <p>Warm regards,</p>
    <p>The FlowLabs Team</p>
</div>
  `;
};
export const ROLE = {
  admin: "admin",
  hr: "hr",
  employee: "employee",
  company: "company",
};
export const COLLECTION_NAME = {
  company: "companydatas",
  employees:'employeedetails',
  admin: "credentials",
  department:'departmentdetails',
  project:'projects'
};
export const TOKEN_NAME = {
  companyRefreshToken: "companyRefreshToken",
  companyAccessToken: "companyAccessToken",
  hrRefreshToken: "hrRefreshToken",
  hrAccessToken: "hrAccessToken",
  employeeRefreshToken: "employeeRefreshToken",
  employeeAccessToken: "employeeAccessToken",
  adminRefreshToken: "adminRefreshToken",
  adminAccessToken: "adminAccessToken",
};
export const S3_BUCKET_IMAGE_URL='https://flowlabsbucket.s3.ap-south-1.amazonaws.com'