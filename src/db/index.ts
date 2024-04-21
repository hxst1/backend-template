import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.log('Database not connected:', error);
        throw error;
    }
};