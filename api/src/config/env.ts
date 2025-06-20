import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000;
export const GEOLOCATION_API_URL = process.env.GEOLOCATION_API_URL || "http://localhost:8080";
export const IMAGE_PROCESSING_API_URL = process.env.IMAGE_PROCESSOR_URL || "http://localhost:8081";
export const TEXT_PROCESSING_API_URL = process.env.TEXT_PROCESSOR_URL || "http://localhost:8082";