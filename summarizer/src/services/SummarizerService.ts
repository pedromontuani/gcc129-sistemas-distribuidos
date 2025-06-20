import axios from "axios";
import {OPENROUTER_API_KEY, OPENROUTER_API_URL} from "../config/env";
import {ImageData} from "../types/Image";

const api = axios.create({
    baseURL: OPENROUTER_API_URL,
    headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
    }
});

export const summarizeText = async (imageData: ImageData[]): Promise<string> => {
    try {
        const formattedData = imageData.map((item, index) => `- Image ${index + 1}: tags ${item.tags.join(", ")}; categories ${item.categories.join(", ")}; address ${item.address}; timestamp ${item.timestamp || "N/A"}`).join(".\n");

        let prompt = `You are an expert in objective visual reports.
            With the list of images, alongside with their tags, categories and address extracted from the images, 
            generate a clear and direct report in Brazilian Portuguese based on this data.
            ${formattedData}.
            Do not add information or interpretations that are not explicitly in the 
            tags or categories provided. Describe it simply for someone who cannot see 
            the image. Generate only the report, with no introduction or extra comments. 
            Start directly with the report content.`;

        const body = {
            model: "meta-llama/llama-3-70b-instruct",
            messages: [
                {
                    role: "system",
                    content: "Você é um especialista em laudos de imagens para pessoas com deficiência visual."
                },
                {role: "user", content: prompt},
            ],
            max_tokens: 512,
            temperature: 0.7,
        };

        const hfResponse = await api.post(
            '/',
            body,
        );

        return hfResponse.data?.choices?.[0]?.message?.content || "Não foi possível gerar relatório.";

    } catch (error) {
        console.error("Error summarizing text:", error);
        throw new Error("Failed to summarize text.");
    }
};


