import mongoose, { Connection } from 'mongoose';
import { envConfig } from '../../shared/config/env.config';
import slugify from 'slugify';

export class CompanyDbService {
    // Establish a connection to a company's database
    public async getConnection(companyName: string): Promise<Connection | null> {
        const dbName = slugify(companyName).toUpperCase();
        
        try {
            // Create a new connection for the specific company database
            const newConnection = mongoose.createConnection(`${envConfig.MONGODB_URI}${dbName}`);

            // Ensure the connection is established
            await new Promise<void>((resolve, reject) => {
                newConnection.once('open', resolve);
                newConnection.once('error', reject);
            });

            return newConnection;
        } catch (error) {
            console.error(`Failed to connect to database: ${dbName}`, error);
            return null;
        }
    }

    // Check if a database for the given company already exists
    public async checkExistingDb(companyName: string): Promise<boolean> {
        const dbName = slugify(companyName).toUpperCase();

        try {
            // Create a connection to the admin database
            const adminConnection = mongoose.createConnection(`${envConfig.MONGODB_URI}admin`);

            await new Promise<void>((resolve, reject) => {
                adminConnection.once('open', resolve);
                adminConnection.on('error', reject);
            });
            // Use the admin interface to list all databases
            const admin = adminConnection?.db?.admin();
            const dbs = await admin?.listDatabases();
    
            // Close the admin connection after the query
            await adminConnection.close(); 

            // Check if the desired database exists in the list of databases
            const out= dbs?.databases.some((db: { name: string }) => db.name === dbName) || false;
            return out
        } catch (error) {
            console.error(`Error checking if database exists: ${dbName}`, error);
            return true;
        }
    }
}
