FROM node:9-alpine

# Descomentar para usar docker-compose build y up con proxy:
# ENV http_proxy http://168.176.239.41:8080
# ENV https_proxy http://168.176.239.41:8080

# Create app directory
WORKDIR /usr/src/app-ms

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install -g yarn
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3200

CMD [ "npm", "start" ]