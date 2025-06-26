import axios from "axios";
import {LLM_MODEL, LLM_URL} from "../config/env";
import {ImageData} from "../types/Image";

const api = axios.create({
    baseURL: LLM_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const summarizeText = async (imageData: ImageData[]): Promise<string> => {
    try {
        const formattedData = imageData.map((item, index) => `- Image ${index + 1}: tags ${item.tags.join(", ")}; categories ${item.categories.join(", ")}; address ${item.address || "N/A"}; timestamp ${item.timestamp || "N/A"}`).join(".\n");

        let prompt = 'You are an expert in objective visual reports.'
            + 'With the list of images, alongside with their tags, categories, address and timestamp extracted from the images,'
            + 'generate a clear and direct report based on this data.'
            + `${formattedData}.`
            + 'You may add inferences and interpretations based on the provided data.'
            + 'Describe it simply for someone who cannot see'
            + 'the image. Generate only the report, with no introduction or extra comments.'
            + 'Start directly with the report content.'

        const {data} = await api.post(
            '/api/generate',
            {model: LLM_MODEL, prompt, stream: false},
        );

        return data.response || "Não foi possível gerar relatório.";

    } catch (error) {
        console.error("Error summarizing text:", error);
        throw new Error("Failed to summarize text.");
    }
};


