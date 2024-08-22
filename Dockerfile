FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install --fronzen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]