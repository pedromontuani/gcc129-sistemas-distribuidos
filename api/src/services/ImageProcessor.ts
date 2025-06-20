import axios from 'axios';
import {IMAGE_PROCESSING_API_URL} from "../config/env";

const api = axios.create({
    baseURL: IMAGE_PROCESSING_API_URL,
});

interface ImageProcessingResponse {
    tags: string[];
    categories: string[];
    coordinates: {
        lat: string,
        lng: string
    }
    timestamp: string | null;
}

export const processImage = async (imagePath: string) => {
    const formData = new FormData();
    formData.append('image', imagePath);

    const {data}: { data: ImageProcessingResponse } = await api.post('process-image', formData);

    return data;
}