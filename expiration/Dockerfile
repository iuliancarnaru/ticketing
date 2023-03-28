FROM node:18.14.2-alpine

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .

CMD [ "pnpm", "start" ]