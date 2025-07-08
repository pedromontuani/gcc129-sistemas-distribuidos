import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000;
export const GEOLOCATION_API_URL = process.env.GEOLOCATION_API_URL || "http://localhost:8080"
