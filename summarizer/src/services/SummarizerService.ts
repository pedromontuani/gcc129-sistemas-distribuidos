
import axios from "axios";
import { OPENROUTER_API_URL, OPENROUTER_API_KEY } from "../config/env";

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data[0].summary_text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error("Failed to summarize text.");
  }
};


