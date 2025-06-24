import {Router} from "express";
import Multer from "../middlewares/Multer";
import {getExifData, getGpsLatLong} from "../helpers/ImageHelper";
import {deleteFile} from "../helpers/FileHelpers";
import {getCategories, getTags} from "../services/Imagga";
import sharp from "sharp";

const router = Router();

router.post('/', Multer.single('image'), async (req, res) => {
    const {file} = req;

    if (!file) {
        res.status(400).json({error: "Image is required"});
        return;
    }

    const newFilePath = `${file.path}-compressed.jpg`;

    await sharp(file.path).jpeg({
        quality: 60,
        mozjpeg: true,
    }).toFile(newFilePath);
    
    try {
        const tagsResponse = await getTags({path: newFilePath});
        const tags = tagsResponse.data.result.tags.map((tag: any) => tag.tag.en).slice(0, 10);
        const categoriesResponse = await getCategories({path: newFilePath});
        const categories = categoriesResponse.data.result
            .categories.map((cat: any) => cat.name.en).slice(0, 5);
        const exifData = await getExifData(file.path);
        const coordinates = getGpsLatLong(exifData);
        const timestamp = exifData.DateTimeOriginal || exifData.DateTime || null;

        res.status(200).json({
            tags, categories, coordinates, timestamp: timestamp?.description ?? ''
        })
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({error: "Failed to process image"});
    } finally {
        await deleteFile(file.path);
    }
});

export default router;