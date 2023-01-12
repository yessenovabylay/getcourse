FROM node:16-alpine

WORKDIR /usr/src/app

WORKDIR /app
COPY package*.json .
COPY prisma ./prisma/
RUN npm install
COPY . .

EXPOSE 5555
CMD ["npm", "run", "start:migrate:prod"]