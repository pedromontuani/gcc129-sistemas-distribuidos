import axios from 'axios';
import {IMAGE_PROCESSING_API_URL} from "../config/env";
import fs from 'fs';
import FormData from "form-data";

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
    const file = fs.createReadStream(imagePath);
    console.log('imagePath', imagePath);
    formData.append('image', file);

    const {data}: { data: ImageProcessingResponse } = await api.post('/process-image', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return data;
}