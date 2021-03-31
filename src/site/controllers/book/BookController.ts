import { NextFunction, Request, Response } from 'express';
import { BookUseCase } from '../../use-cases/book/BookUseCase';

export class BookController {
  constructor(private useCase: BookUseCase) {}

  handle(req: Request, res: Response, next: NextFunction) {
    return res.json(req.body);
  }
}

export const makeBookController = () => {
  const useCase = new BookUseCase();
  return new BookController(useCase);
};
