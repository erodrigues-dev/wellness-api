import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';
import { Stream } from 'stream';

const bucketName = process.env.GOOGLE_STORAGE_BUCKET;
const folderName = process.env.GOOGLE_STORAGE_BUCKET_FOLDER;
const storage = new Storage();
const bucket = storage.bucket(bucketName);

export function deleteFileFromUrl(url: string) {
  const filename = url.split('/').pop();
  return deleteFile(`${folderName}/${filename}`);
}

export function deleteFile(filename: string) {
  console.log(`deleting file ${filename}`);
  return bucket.file(filename).delete();
}

export function createFileFromStream(fileStream: Stream, filename: string) {
  const key = crypto.randomBytes(16).toString('hex');
  const uniqueName = `${key}-${filename}`;

  return new Promise<{ filename: string; url: string }>((resolve, reject) => {
    const gcFile = bucket
      .file(`${folderName}/${uniqueName}`)
      .createWriteStream();
    gcFile.on('error', reject);
    gcFile.on('finish', () =>
      resolve({
        filename: uniqueName,
        url: `https://storage.googleapis.com/${bucketName}/${folderName}/${uniqueName}`
      })
    );

    fileStream.pipe(gcFile);
  });
}
