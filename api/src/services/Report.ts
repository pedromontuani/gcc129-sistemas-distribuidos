import {processImage} from "./ImageProcessor";
import {getLocationByCoordinates} from "./Location";
import {ImageData} from "../types/Image";
import {LocationResponse} from "../types/Location";
import {processImages} from "./TextProcessor";

const formatAddres = (location: LocationResponse) => {
    const {address: {road, village, state, country}} = location;
    return `${road} ${village}, ${state}, ${country}`;
}

export const generateReport = async (imagePaths: string[]) => {
    const imagesRequests = imagePaths.map(processImage);

    const imageProcessingResponses = await Promise.all(imagesRequests);
    const coordinates = imageProcessingResponses.map(response => (
        response.coordinates
    ));

    const addressesRequests = coordinates.map(({lat, lng}) => getLocationByCoordinates(lat, lng));
    const locationResponses = await Promise.all(addressesRequests);

    const formattedImages: ImageData[] = imageProcessingResponses.map((image, index) => ({
        ...image,
        address: formatAddres(locationResponses[index]),
    }))

    return await processImages(formattedImages);

}