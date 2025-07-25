import * as RNFS from '@dr.pogodin/react-native-fs';

export const saveFile = async (fileUri: string, fileName: string) => {
  try {
    const destPath = `${RNFS.DocumentDirectoryPath}${fileName}`;
    await RNFS.copyFile(fileUri, destPath);
    return `file://${destPath}`;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
};

export const deleteFile = async (fileUri: string) => {
  try {
    const fileExists = await RNFS.exists(fileUri);
    if (fileExists) {
      await RNFS.unlink(fileUri);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const generateRandomFileName = (extension: string = 'jpg') => {
  const randomStr = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  return `img_${timestamp}_${randomStr}.${extension}`;
};
