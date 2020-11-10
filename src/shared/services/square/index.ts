import axios from 'axios';

export const squareApi = axios.create({
  baseURL: process.env.SQUARE_API_URL,
  headers: {
    Authrization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`
  }
});

export const DEFAULT_LOCATION = process.env.SQUARE_LOCATION_ID;
