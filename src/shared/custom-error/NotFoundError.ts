import CustomError from './CustomError'

export class NotFoundError extends CustomError {
  constructor(message: string = 'Not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}
