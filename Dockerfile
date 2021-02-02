FROM node:14-alpine AS builder
WORKDIR /node/src/app
COPY . .
RUN npm install && npm run build

FROM node:14-alpine
WORKDIR /usr/app
COPY --from=builder /node/src/app/dist ./
COPY --from=builder /node/src/app/package.json ./package.json
RUN npm install --only=prod
EXPOSE 3000
CMD [ "node", "src/main.js" ]
