# Build para converter TS em JS e reduzir tamanho da imagem
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Runtime
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV PORT=3333
EXPOSE 3333

CMD ["node", "dist/main.js"]