import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3001;
export const LLM_URL = process.env.LLM_URL || "https://openrouter.ai/api/v1/chat/completions";
export const LLM_MODEL = process.env.LLM_MODEL || "gpt-4o-mini";