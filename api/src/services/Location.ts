import axios from 'axios';
import {GEOLOCATION_API_URL} from '../config/env';
import {LocationResponse} from "../types/Location";

const api = axios.create({
    baseURL: GEOLOCATION_API_URL,
});


export const getLocationByCoordinates = async (lat: string, lon: string) => {
    const {data} = await api.get<LocationResponse>('/location/query', {
        params: {
            latitude: lat,
            longitude: lon,
        },
    });

    return data;
};