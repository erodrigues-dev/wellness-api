FROM node:14-alpine AS builder

WORKDIR /usr/build
COPY package.json ./
RUN npm i --save-exact

COPY . .

RUN npm run build


FROM node:14-alpine

WORKDIR /usr/app

COPY --from=builder /usr/build/node_modules ./node_modules
COPY --from=builder /usr/build/package*.json ./
COPY --from=builder /usr/build/.sequelize* ./
COPY --from=builder /usr/build/dist ./src

COPY .env .
COPY google-cloud-key.json .

EXPOSE 3333

CMD ["npm", "start"]
