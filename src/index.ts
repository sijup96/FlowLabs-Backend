import { connectDatabase } from "./shared/config/db.config";
import { createServer } from "./frameworks/Server/server"
import Redis from 'ioredis';
const startServer = async () => {
    try {
        const app = await createServer();
        await connectDatabase();


const redis = new Redis();

async function getAllData() {
    // await redis.flushdb();

    const keys: string[] = [];
    const stream = redis.scanStream();
    
    stream.on('data', (resultKeys: string[]) => {
        keys.push(...resultKeys);
    });
    
    stream.on('end', async () => {
        console.log('Keys retrieved:', keys);

        // Fetch all values for the retrieved keys
        const allData: { [key: string]: string|null } = {};
        for (const key of keys) {
            const value = await redis.get(key);
            allData[key] = value;
        }

        console.log('All data:', allData);
    });
}

getAllData().catch(console.error);

    } catch (error) {
        console.log(error);
    }
}
startServer();