export const ORIGIN_URL='http://localhost:5173'
export const SIGNUP_EMAIL_BODY=(domainName:string)=>{
return `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">Thanks for joining FlowLabs!</h2>
                    <p>Hello,</p>
                    <p>We’re excited to have you on board! Please click the button below to log in to your FlowLabs account:</p>
                    
                    <a href="https://www.${domainName}.com" target="_blank" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Log In to FlowLabs</a>
                    
                    <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
                    <p><a href="https://www.${domainName}.com" target="_blank">https://www.${domainName}.com</a></p>
                    
                    <p>We’re here to help if you have any questions. Welcome aboard!</p>
                    <p>Best regards,</p>
                    <p>The FlowLabs Team</p>
                </div>
                `
}

export const EMAIL_USER_INFO_URI='https://www.googleapis.com/oauth2/v3/userinfo'