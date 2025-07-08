import fs from 'fs';

export const toBase64 = async (filePath: string) => {
    return fs.readFileSync(filePath).toString('base64');
}

export const deleteFile = async (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
    }
    return false;
}