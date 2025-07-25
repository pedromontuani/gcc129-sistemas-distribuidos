import axios from 'axios';
import { generateRandomFileName } from '../helpers/Files.ts';

const client = axios.create({
  baseURL: 'http://100.96.1.2:3001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 0,
});

export const generateReport = async (images: string[]) => {
  const formData = new FormData();
  images.forEach(image => {
    const imageExtension = image.split('.').pop();
    formData.append('images', {
      uri: image,
      type: 'image/jpeg',
      name: generateRandomFileName(imageExtension),
    });
  });

  return client.post('/summarize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
