import {Router} from "express";
import {getLocationByCoordinates} from "../services/Location";

const router = Router();

router.get("/query", async (req, res) => {
    try {
        const {latitude, longitude} = req.query;
        const response = await getLocationByCoordinates(String(latitude), String(longitude));
        res.status(200).json(response);
    } catch (error) {
        console.error("Error searching for location:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export default router;