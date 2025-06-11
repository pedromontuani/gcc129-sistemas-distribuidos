import { Router } from "express";
import { PassThrough } from 'stream';
import { getCategories, getCategorizers, getTags } from "../services/Imagga";
import Multer from '../middlewares/Multer';
import fs from 'fs';
const router = Router();


router.post("/image-tags", Multer.single('image'), async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: "Image stream is required" });
    }

    try {
        const response = await getTags(file);
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Error fetching image tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/image-categorizers", async (req, res) => {
    try {
        const response = await getCategorizers();
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching image categorizers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/image-categorizer", async (req, res) => {
    const { categorizerId, imageStream } = req.body;

    if (!categorizerId || !imageStream) {
        return res.status(400).json({ error: "Categorizer ID and image stream are required" });
    }

    try {
        const response = await getCategories(categorizerId, imageStream);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching image categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;