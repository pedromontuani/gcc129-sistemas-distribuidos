import {Router} from "express";
import Multer from "../middlewares/Multer";
import {getCategories, getTags} from "../services/Imagga";
import {getExifData, getGpsLatLong} from "../helpers/ImageHelper";
import {deleteFile} from "../helpers/FileHelpers";

const router = Router();

router.post('/process-image', Multer.single('image'), async (req, res) => {
    const {file} = req;

    if (!file) {
        res.status(400).json({error: "Image is required"});
        return;
    }

    try {
        const tagsResponse = await getTags(file);
        const tags = tagsResponse.data.result.tags.map((tag: any) => tag.tag.en);
        const categoriesResponse = await getCategories(file);
        const categories = categoriesResponse.data.result.categories.map((cat: any) => cat.name.en);
        const exifData = await getExifData(file.path);
        const coordinates = getGpsLatLong(exifData);
        const timestamp = exifData.DateTimeOriginal || exifData.DateTime || null;

        res.status(200).json({
            tags, categories, coordinates, timestamp
        })
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({error: "Failed to process image"});
    } finally {
        await deleteFile(file.path);
    }
});

export default router;