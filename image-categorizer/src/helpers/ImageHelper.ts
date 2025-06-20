import fs from 'fs';
import ExifReader from 'exifreader';

const convertToDecimal = (value: ExifReader.Tags['GPSLatitude'] | ExifReader.Tags['GPSLongitude'], ref: string) => {
    if (!value || !value.description) {
        return null;
    }
    const coordinate = Number(value.description);

    return ['S', 'W'].includes(ref) ? coordinate * -1 : coordinate;
}

export const getExifData = async (filePath: string) => {
    const file = fs.readFileSync(filePath);
    return await ExifReader.load(file, {async: true});
}

export const getGpsLatLong = (exifData: ExifReader.Tags) => {
    const latitude = exifData.GPSLatitude;
    const longitude = exifData.GPSLongitude;

    if (!latitude || !longitude) {
        return null;
    }

    const latRef = (exifData.GPSLatitudeRef?.value as Array<string>)?.[0] || 'N';
    const lonRef = (exifData.GPSLongitudeRef?.value as Array<string>)?.[0] || 'E';

    const lat = convertToDecimal(latitude, latRef);
    const lng = convertToDecimal(longitude, lonRef);

    return {lat, lng};
}