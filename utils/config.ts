import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  username:'Admin',
  password:'admin123',
};
/*
npm i --save-dev @types/node
npx playwright test

*/