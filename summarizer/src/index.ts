import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { PORT } from "./config/env";
import SummarizerController from "./controllers/SummarizerController";
import { startMcpServer } from "./mcp-server";
import { summarizeText } from "./services/SummarizerService"; // IMPORTAÇÃO para reusar a lógica
import { ImageData } from "./types/Image"; // Ajuda no type-safe

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

// -------------- MCP SERVER INTEGRATION ---------------

startMcpServer(async (payload: any) => {
  // Espera receber { images: ImageData[] } ou apenas ImageData[]
  let images: ImageData[] | undefined;

  // Aceita ambos formatos: { images: [...] } ou só o array
  if (Array.isArray(payload)) {
    images = payload as ImageData[];
  } else if (payload.images && Array.isArray(payload.images)) {
    images = payload.images as ImageData[];
  }

  if (!images || images.length === 0) {
    return JSON.stringify({ error: "Invalid data format. Expected an array of image data." });
  }

  try {
    const summary = await summarizeText(images);
    // Retorna como JSON
    return JSON.stringify({ summary });
  } catch (e) {
    console.error("Error generating report via MCP:", e);
    return JSON.stringify({ error: "Failed to generate report." });
  }
});
