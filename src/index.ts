import { startServer } from './server/startServer';
import { connectDatabase } from './db';
import app from './server';


const port = process.env.PORT || 4000;

(async () => {
    try {
        await connectDatabase();
        startServer(app, port);
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`)
    }
})();