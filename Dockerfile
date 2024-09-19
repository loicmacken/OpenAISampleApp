FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

COPY . .

EXPOSE $NODE_PORT

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run test; fi; fi"]
