FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]