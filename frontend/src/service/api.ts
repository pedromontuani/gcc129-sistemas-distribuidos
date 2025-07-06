import axios from 'axios';
import { generateRandomFileName } from '../helpers/Files.ts';
import { sendToSummarizer } from '../../../image-categorizer/src/mcp-client.ts';

const client = axios.create({
  baseURL: 'http://192.168.0.119:3001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 0,
});

// export const generateReport = async (images: string[]) => {
//   const formData = new FormData();
//   images.forEach(image => {
//     const imageExtension = image.split('.').pop();
//     formData.append('images', {
//       uri: image,
//       type: 'image/jpeg',
//       name: generateRandomFileName(imageExtension),
//     });
//   });

//   return client.post('/summarize', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

export const generateReport = async (images: string[]) => {
  // Envia as imagens como JSON string
  const payload = JSON.stringify({ images });
  // Aguardar a resposta do summarizer via MCP (TCP)
  const response = await sendToSummarizer(payload);

  // Dependendo de como a resposta vier, talvez precise fazer JSON.parse(response)
  // return JSON.parse(response);

  return response;
};
