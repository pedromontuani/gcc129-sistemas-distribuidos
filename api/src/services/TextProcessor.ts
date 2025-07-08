import axios from 'axios';

import {TEXT_PROCESSING_API_URL} from '../config/env'
import {ImageData} from "../types/Image";

const api = axios.create({
    baseURL: TEXT_PROCESSING_API_URL,
});

export const processImages = async (imageData: ImageData[]) => {
    const {data}: { data: ImageData[] } = await api.post('/summarize', imageData);

    return data;
}