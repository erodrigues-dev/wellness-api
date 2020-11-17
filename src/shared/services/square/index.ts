import axios from 'axios';

import { SquareCustomerService } from './SquareCustomerService';
import { SquarePaymentService } from './SquarePaymentService';

export const squareApi = axios.create({
  baseURL: process.env.SQUARE_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`
  }
});

export const DEFAULT_LOCATION = process.env.SQUARE_LOCATION_ID;

export const squareCustomerService = new SquareCustomerService(squareApi);
export const squarePaymentService = new SquarePaymentService(squareApi);
