import {Request, Response, Router} from "express";
import Multer from '../middlewares/Multer'
import {generateReport} from "../services/Report";
import {deleteFile} from "../helpers/FileHelpers";

const router = Router();

router.post('/', Multer.array('images'), async (req: Request, res: Response) => {
    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0) {
        res.status(400).json({error: "No images provided"});
        return;
    }

    const imagePaths = images.map(image => image.path);

    try {
        const summary = await generateReport(imagePaths);
        res.status(200).json(summary);
    } catch (error) {
        console.error("Error processing images:", error);
        res.status(500).json({error: "Failed to process images"});
    } finally {
        for await (const image of imagePaths) {
            await deleteFile(image);
        }
    }

})

export default router;