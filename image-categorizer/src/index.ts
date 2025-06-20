import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import TestController from "./controllers/Test";
import MainController from './controllers';

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

app.use('/', MainController);
app.use('/test', TestController);

app.get("/health", (_req: Request, res: Response) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
