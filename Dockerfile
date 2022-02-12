FROM node:16-alpine AS builder

WORKDIR /usr/build
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---------------

FROM node:16-alpine

WORKDIR /usr/app

COPY --from=builder /usr/build/node_modules ./node_modules
COPY --from=builder /usr/build/package*.json ./
COPY --from=builder /usr/build/dotenv-config.js ./
COPY --from=builder /usr/build/.sequelize* ./
COPY --from=builder /usr/build/dist ./src

EXPOSE 3333

CMD ["npm", "start"]
