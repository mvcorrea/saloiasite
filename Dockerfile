


FROM node:13.12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5001
CMD [ "yarn", "start" ]
