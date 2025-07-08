import axios, {AxiosResponse} from 'axios';
import {IMAGGA_API_KEY, IMAGGA_API_SECRET, IMAGGA_API_URL} from '../config/env';
import {toBase64} from "../helpers/FileHelpers";
import {CategoriesResponse, CategorizersResponse, TagsResponse} from "../types/Imagga";

const api = axios.create({
    baseURL: IMAGGA_API_URL,
    auth: {
        username: IMAGGA_API_KEY,
        password: IMAGGA_API_SECRET,
    }
});


export const getTags = async (image: { path: string }) => {
    const formData = new FormData();
    formData.append('image_base64', await toBase64(image.path));

    return api.post<TagsResponse>('/tags', formData);
};

export const getCategorizers = async () => {
    return api.get<void, AxiosResponse<CategorizersResponse>>('/categorizers');
}

export const getCategories = async (image: { path: string }, categorizerId: string = 'personal_photos') => {
    const formData = new FormData();
    formData.append('image_base64', await toBase64(image.path));

    return api.post<CategoriesResponse>(`/categories/${categorizerId}`, formData);
}