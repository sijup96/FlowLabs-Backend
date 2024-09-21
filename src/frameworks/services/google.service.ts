import { OAuth2Client } from "google-auth-library";
import { IGoogleUser } from "../../interface/company/ICompany.signUp";
import { envConfig } from "../../shared/config/env.config";
import axios from 'axios'
import { EMAIL_USER_INFO_URI } from "../../shared/constants";

export class GoogleService {
    private client: OAuth2Client
    constructor() {
        this.client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID)
    }
    async verifyGoogleToken(token: string): Promise<IGoogleUser | null> {
        try {
            const response=await axios.get(EMAIL_USER_INFO_URI,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            return response.data
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}