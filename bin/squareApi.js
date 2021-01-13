const axios = require('axios');

require('dotenv').config({ path: '../.env' });

const squareApi = axios.create({
  baseURL: process.env.SQUARE_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`
  }
});

module.exports = squareApi;
