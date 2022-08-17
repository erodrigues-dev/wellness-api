const { config } = require('dotenv');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV;

let dotEnvExist = false;

if (NODE_ENV) {
  console.log(`>> dotEnv load ${NODE_ENV}`);
  dotEnvExist = fs.existsSync(`.env.${NODE_ENV}`);
  if (!dotEnvExist) {
    console.log(`.env.${NODE_ENV} not found trying load .env`);
  }
}

config({
  path: dotEnvExist ? `.env.${NODE_ENV}` : '.env'
});
