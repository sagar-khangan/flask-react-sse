FROM node:9.6.1
ADD ./app /app
WORKDIR /app
EXPOSE 3000
RUN npm install --silent
ENTRYPOINT ["npm", "start"]
