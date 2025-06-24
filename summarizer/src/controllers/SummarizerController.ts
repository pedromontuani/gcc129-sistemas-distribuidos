import {Request, Response, Router} from "express";
import {ImageData} from "../types/Image";
import {summarizeText} from "../services/SummarizerService";

// Configuração do multer para uploads em memória
// const upload = multer({dest: "/tmp"});

// URLs e chave de API


// // Utilitário para enviar imagem para endpoints da API principal
// async function postImageToEndpoint(endpoint: string, imagePath: string, extraFields?: any) {
//     const form = new FormData();
//     form.append("image", fs.createReadStream(imagePath));
//     if (extraFields) {
//         Object.entries(extraFields).forEach(([key, value]) => {
//             form.append(key, value as string);
//         });
//     }
//     return axios.post(`${API_URL}${endpoint}`, form, {headers: form.getHeaders()});
// }

const router = Router();

/**
 * Endpoint para gerar relatório, recebendo upload via form-data (campo: image)
 */
// router.post("/generate-report", upload.single("image"), async (req: Request, res: Response) => {
//     const file = req.file;
//     const categorizerId = req.body.categorizerId; // opcional
//
//     if (!file) {
//         res.status(400).json({error: "Image is required (campo image)"});
//         return;
//     }
//
//     try {
//         // 1. Obter TAGS
//         const tagsResponse = await postImageToEndpoint("/image-tags", file.path);
//         const tags: string[] = tagsResponse.data.tags;
//
//         // Usa só as 10 primeiras tags
//         const filteredTags = tags.slice(0, 10);
//
//         // 2. Obter CATEGORIAS (opcional)
//         let categories: string[] = [];
//         if (categorizerId) {
//             const categoriesResponse = await postImageToEndpoint("/image-categories", file.path, {categorizerId});
//             categories = categoriesResponse.data.result?.categories?.map((cat: any) => cat.name?.en) || [];
//         }
//
//         // 3. Obter COORDENADAS
//         const exifResponse = await postImageToEndpoint("/image-exif", file.path);
//         const coordinates = exifResponse.data.coordinates || null;
//
//         // 4. Montar prompt para IA (usando só as 10 primeiras tags)
//         let prompt = `You are an expert in objective visual reports.
//             With the list of tags, categories and coordinates extracted from an image,
//             generate a clear and direct report in Portuguese based on this data.
//             - Tags: ${filteredTags.join(", ")}
//             ${categories.length > 0 ? `- Categories: ${categories.join(", ")}` : ""}
//             ${coordinates ? `- Coordinates: ${JSON.stringify(coordinates)}` : ""}
//             Do not add information or interpretations that are not explicitly in the
//             tags or categories provided. Describe it simply for someone who cannot see
//             the image. Generate only the report, with no introduction or extra comments.
//             Start directly with the report content.`;
//
//         // 5. Chamada ao modelo
//         const data = {
//             model: "meta-llama/llama-3-70b-instruct",
//             messages: [
//                 {
//                     role: "system",
//                     content: "Você é um especialista em laudos de imagens para pessoas com deficiência visual."
//                 },
//                 {role: "user", content: prompt},
//             ],
//             max_tokens: 512,
//             temperature: 0.7,
//         };
//
//         const hfResponse = await axios.post(
//             OPENROUTER_API_URL,
//             data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//
//         const summary = hfResponse.data?.choices?.[0]?.message?.content || "Não foi possível gerar relatório.";
//
//         res.status(200).json({
//             summary,
//             tags: filteredTags,
//             categories,
//             coordinates,
//         });
//
//     } catch (error: any) {
//         console.error("Error generating report:", error.response?.data || error.message || error);
//         res.status(500).json({error: error.response?.data?.error || error.message || "Internal Server Error"});
//     } finally {
//         // Remove o arquivo temporário
//         if (file && file.path) fs.unlink(file.path, () => {
//         });
//     }
// });


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
