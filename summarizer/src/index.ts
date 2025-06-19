import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { PORT } from "./config/env";
import SummarizerController from "./controllers/SummarizerController";

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal do controller
app.use('/summarize', SummarizerController);

app.get("/health", (_req: Request, res: Response) => {
  res.sendStatus(200);
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Summarizer Server running on port ${PORT}`);
});
