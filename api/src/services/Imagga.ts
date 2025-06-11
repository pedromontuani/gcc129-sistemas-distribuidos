import axios, { AxiosResponse } from 'axios';
import { IMAGGA_API_KEY, IMAGGA_API_SECRET, IMAGGA_API_URL } from '../config/env';
import fs from 'fs';

interface ImaggaResponse {
    result: unknown,
    status: {
        text: string,
        type: string,
    }
}

interface TagsResponse extends ImaggaResponse {
    result: {
        tags: Array<{
            confidence: number,
            tag: {
                en: string,
            }
        }>,
    }
}

interface CategoriesResponse extends ImaggaResponse {
    result: {
        categories: Array<{
            confidence: number,
            name: {
                en: string,
            }
        }>
    }
}

interface CategorizersResponse extends ImaggaResponse {
    result: {
        categorizers: Array<{
            id: string,
            labels: string[],
            title: string,
        }>
    }
}

interface UploadResponse extends ImaggaResponse {
    result: {
        upload_id: string,
    }
}

const api = axios.create({
    baseURL: IMAGGA_API_URL,
    auth: {
        username: IMAGGA_API_KEY,
        password: IMAGGA_API_SECRET,
    }
});

const uploadImage = async (file: Express.Multer.File) => {
    const base64Image = fs.readFileSync(file.path).toString('base64');
    const formData = new FormData();
    formData.append('image_base64', base64Image);
    return api.post<FormData, AxiosResponse<UploadResponse>>('/uploads', formData);
}

export const getTags = async (file: Express.Multer.File) => {
    const {data: {result: {upload_id}}} = await uploadImage(file);
    return api.get<void, AxiosResponse<TagsResponse>>('/tags', {
        params: {
            image_upload_id: upload_id,
        }
    });
};

export const getCategorizers = async () => {
    return api.get<void, AxiosResponse<CategorizersResponse>>('/categorizers');
}

export const getCategories = async (categorizerId: string, imageStream: Buffer) => {
    const formData = new FormData();
    formData.append('image', imageStream);
    return api.post<FormData, AxiosResponse<CategoriesResponse>>(`/categories/${categorizerId}`, formData);
}