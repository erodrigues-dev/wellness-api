import { Express } from 'express';

export interface ICloudFile extends Express.Multer.File {
  url: string;
  filename: string;
}
