export interface ImageData {
    tags: string[];
    categories: string[];
    coordinates: {
        lat: string;
        lng: string;
    };
    address: string;
    timestamp: string | null;
}