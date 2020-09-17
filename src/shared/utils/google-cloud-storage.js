const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');

const bucketName = process.env.GOOGLE_STORAGE_BUCKET;
const storage = new Storage();
const bucket = storage.bucket(bucketName);

function deleteFileFromUrl(url) {
  const filename = url.split('/').pop();
  return deleteFile(filename);
}

function deleteFile(filename) {
  return bucket.file(filename).delete();
}

function createFileFromStream(fileStream, filename) {
  const key = crypto.randomBytes(16).toString('hex');
  const uniqueName = `${key}-${filename}`;

  return new Promise((resolve, reject) => {
    const gcFile = bucket.file(uniqueName).createWriteStream();
    gcFile.on('error', reject);
    gcFile.on('finish', () =>
      resolve({
        filename: uniqueName,
        url: `https://${bucketName}.storage.googleapis.com/${uniqueName}`
      })
    );

    fileStream.pipe(gcFile);
  });
}

module.exports = {
  createFileFromStream,
  deleteFile,
  deleteFileFromUrl
};
