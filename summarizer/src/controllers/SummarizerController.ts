import {Request, Response, Router} from "express";
import {ImageData} from "../types/Image";
import {summarizeText} from "../services/SummarizerService";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const data: ImageData[] = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        res.status(400).json({error: "Invalid data format. Expected an array of image data."});
        return;
    }

    try {
        const summary = await summarizeText(data);

        res.status(200).json({summary});
    } catch (e) {
        console.error("Error generating report:", e);
        res.status(500).json({error: "Failed to generate report."});
    }
});

export default router;
