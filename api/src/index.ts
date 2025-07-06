import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//import MainController from "./controllers";
import SummarizeController from "./controllers/SummarizeController";

import {PORT} from "./config/env";

const app = express();

// Middleware
app.use(helmet())
app.use(morgan('tiny'));
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    }),
)
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//app.use('/summarize', MainController);
app.use('/summarize', SummarizeController);

app.get("/health", (_req: Request, res: Response) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
