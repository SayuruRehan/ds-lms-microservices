FROM node:18
WORKDIR /
COPY package*.json ./
RUN npm install
CMD ["nodemon", "server.js"]
EXPOSE 4002