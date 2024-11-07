import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
});

export default prismaClient;

export const prismaClientWithLogs = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

prismaClientWithLogs.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms')
});