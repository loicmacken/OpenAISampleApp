FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

COPY . .

ENV PORT=8080

EXPOSE 8080

ENV POSTGRES_USER $DB_USER
ENV POSTGRES_PASSWORD $DB_PASSWORD
ENV POSTGRES_DB $DB_NAME_PROD if [ "$NODE_ENV" = "production" ]; else $DB_NAME_DEV if [ "$NODE_ENV" = "development"]; else $DB_NAME_TEST if [ "$NODE_ENV" = "test"]; fi

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; elif [ \"$NODE_ENV\" = 'test' ]; then npm run test; else npm run dev; fi"]
