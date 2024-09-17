FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; elif [ \"$NODE_ENV\" = 'test' ]; then npm run test; else npm run dev; fi"]
