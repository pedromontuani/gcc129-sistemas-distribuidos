import axios from 'axios';
import {GEOLOCATION_API_URL} from "../config/env";

const api = axios.create({
    baseURL: GEOLOCATION_API_URL,
});

export const getLocationByCoordinates = async (lat: string, lon: string) => {
    const {data}: { data: LocationResponse } = await api.get(`/reverse`, {
        params: {
            lat,
            lon,
            format: 'jsonv2'
        }
    })

    return data;
}