FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

COPY . .

EXPOSE $NODE_PORT

CMD ["sh", "-c", "npm start"]
