require('dotenv').config();
/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

async function test() {
  console.log('--- START DIAGNOSTIC ---');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:./dev.db"
        }
      }
    });
    console.log('Client instantiated');
    
    await prisma.$connect();
    console.log('Connected successfully');
    
    const projectCount = await prisma.project.count();
    console.log('Current project count:', projectCount);
    
    await prisma.$disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('DIAGNOSTIC FAILED:');
    console.error(err);
  }
  console.log('--- END DIAGNOSTIC ---');
}

test();
