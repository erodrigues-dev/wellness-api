import { Request } from 'express';
import IFile from './IFile';

export default interface IRequestWithFile extends Request {
  file?: IFile;
}
