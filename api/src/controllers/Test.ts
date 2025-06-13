import {Router} from "express";
import {getCategories, getCategorizers, getTags} from "../services/Imagga";
import Multer from '../middlewares/Multer';
import {deleteFile} from "../helpers/FileHelpers";
import {getExifData, getGpsLatLong} from "../helpers/ImageHelper";

const router = Router();


router.post("/image-tags", Multer.single('image'), async (req, res) => {
    const {file} = req;

    if (!file) {
        res.status(400).json({error: "Image is required"});
        return;
    }

    try {
        const response = await getTags(file);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching image tags:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/categorizers", async (_, res) => {
    try {
        const response = await getCategorizers();
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching image categorizers:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post("/image-categories", Multer.single('image'), async (req, res) => {
    const {file} = req;
    const {categorizerId} = req.body;

    if (!file) {
        res.status(400).json({error: "Image is required"});
        return;
    }

    try {
        const response = await getCategories(file, categorizerId);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching image categories:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/image-exif", Multer.single('image'), async (req, res) => {
    const {file} = req;

    if (!file) {
        res.status(400).json({error: "Image is required"});
        return;
    }

    try {
        const data = await getExifData(file.path);

        res.status(200).json({
            coordinates: getGpsLatLong(data),
        });
    } catch (error) {
        console.error("Error fetching image EXIF data:", error);
        res.status(500).json({error: "Internal Server Error"});
    } finally {
        await deleteFile(file.path);
    }

})

export default router;