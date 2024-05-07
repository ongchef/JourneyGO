FROM node:18

WORKDIR /

COPY . .

RUN yarn install;
RUN npm install;

RUN echo "DB = $DB"

CMD ["yarn", "start"]