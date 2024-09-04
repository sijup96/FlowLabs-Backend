import mongoose, { Connection } from 'mongoose';
import { envConfig } from '../../shared/config/env.config';

export class CompanyDbService {
    private connections: Map<string, Connection> = new Map();

    public async getConnection(dbName: string): Promise<Connection> {
        if (!this.connections.has(dbName)) {
            const newConnection = mongoose.createConnection(`${envConfig.MONGODB_URI}${dbName}`);
            this.connections.set(dbName, newConnection);

            // Wait for the connection to be ready
            await new Promise<void>((resolve, reject) => {
                newConnection.once('open', resolve);
                newConnection.once('error', reject);
            });

            return newConnection;
        }
        return this.connections.get(dbName)!;
    }
}
