import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  baseUrl: process.env.BASE_URL || 'https://www.martinus.sk',
  headless: process.env.HEADLESS === 'true',
  viewport: {
    width: 1920,
    height: 1080,
  },
};