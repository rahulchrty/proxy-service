FROM node:latest

RUN mkdir -p /home/src/app/node_modules && chown -R node:node /home/src/app

# Create app directory
WORKDIR /home/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

USER node

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

EXPOSE 9444
CMD [ "node", "server.js" ]