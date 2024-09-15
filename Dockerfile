FROM node:lts

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

COPY . .

ENV PORT=8080

EXPOSE 8080

ENV NODE_ENV $NODE_ENV

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; elif [ \"$NODE_ENV\" = 'test' ]; then npm run test; else npm run dev; fi"]
