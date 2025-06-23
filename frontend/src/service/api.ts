import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 0,
});

export const generateRandomImageName = (extension: string = 'jpg') => {
  const randomStr = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  return `img_${timestamp}_${randomStr}.${extension}`;
};

export const uploadImages = async (images: string[]) => {
  const formData = new FormData();
  images.forEach(image => {
    const imageExtension = image.split('.').pop();
    formData.append('images', {
      uri: image,
      type: 'image/jpeg',
      name: generateRandomImageName(imageExtension),
    });
  });

  return client.post('/upload', formData);
};
