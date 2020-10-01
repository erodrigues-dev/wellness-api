FROM node:12-alpine AS builder

WORKDIR /usr/build
COPY package.json ./
RUN npm i

COPY . .
RUN npm run build


FROM node:12-alpine

WORKDIR /usr/app

COPY --from=builder /usr/build/package*.json ./
COPY --from=builder /usr/build/dist ./
COPY --from=builder /usr/build/node_modules ./node_modules

EXPOSE 3333

CMD ["npm", "start"]
