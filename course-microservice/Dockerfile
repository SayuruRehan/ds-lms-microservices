FROM node:20
WORKDIR /src
COPY package*.json ./
RUN npm install
CMD ["nodemon", "src/index.js"]
EXPOSE 4003