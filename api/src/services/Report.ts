import {processImage} from "./ImageProcessor";
import {getLocationByCoordinates} from "./Location";
import {ImageData} from "../types/Image";
import {LocationResponse} from "../types/Location";
import {processImages} from "./TextProcessor";

const formatAddress = (location: LocationResponse) => {
    const {address} = location;
    const {road, state, country} = address ?? {};
    return `${road}, ${state}, ${country}`;
}

export const generateReport = async (imagePaths: string[]) => {
    const imageProcessingResponses = [];

    for await (const path of imagePaths) {
        const result = await processImage(path);
        if (result) {
            imageProcessingResponses.push(result);
        }
    }

    const addressesRequests = imageProcessingResponses.map(response => {
        const {coordinates} = response;
        if (!!coordinates?.lng && !!coordinates?.lat) {
            return getLocationByCoordinates(coordinates.lat, coordinates.lng)
        }
        return null;
    })

    const locationResponses = await Promise.all(addressesRequests);

    const formattedImages: ImageData[] = imageProcessingResponses.map((image, index) => ({
        ...image,
        address: locationResponses?.[index] ? formatAddress(locationResponses[index]) : '',
    }))

    return await processImages(formattedImages);

}
