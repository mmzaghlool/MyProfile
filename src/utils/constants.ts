/* eslint-disable no-undef */
require('dotenv').config();

export const AWS_ID = process.env.AWS_ID;
export const AWS_SECRET = process.env.AWS_SECRET;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const PORT = process.env.PORT;

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASS = process.env.DATABASE_PASS;
export const BUCKET_NAME = process.env.BUCKET_NAME;
