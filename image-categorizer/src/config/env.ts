import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000;
export const IMAGGA_API_URL = process.env.IMAGGA_API_URL || "https://api.magga.ai/v1";
export const IMAGGA_API_KEY = process.env.IMAGGA_API_KEY || "default_api_key";
export const IMAGGA_API_SECRET = process.env.IMAGGA_API_SECRET
    || "default_api_secret";
