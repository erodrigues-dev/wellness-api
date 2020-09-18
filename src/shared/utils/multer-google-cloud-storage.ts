import { Request, Express } from 'express';
import multer, { FileFilterCallback } from 'multer';

import { createFileFromStream, deleteFile } from './google-cloud-storage';

type Callback = (err?: any, info?: Partial<CloudFile>) => void;

interface CloudFile extends Express.Multer.File {
  url: string;
  filename: string;
}

function handleFile(req: Request, file: Express.Multer.File, cb: Callback) {
  createFileFromStream(file.stream, file.originalname)
    .then(({ url, filename }) => cb(null, { url, filename }))
    .catch(cb);
}

function removeFile(req: Request, file: CloudFile, cb: Callback) {
  deleteFile(file.filename)
    .then(() => cb(null))
    .catch(cb);
}

function fileFilter(
  mimetypes: string[],
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (mimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File not permitted'));
  }
}

export default function (mimetypes: string[]) {
  return multer({
    fileFilter: (_, file, cb) => fileFilter(mimetypes, file, cb),
    storage: {
      _handleFile: handleFile,
      _removeFile: removeFile
    }
  });
}
