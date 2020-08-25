FROM node:latest

RUN mkdir -p /home/node_modules && chown -R node:node /home

# Create app directory
WORKDIR /home

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

EXPOSE 9441
CMD [ "node", "server.js" ]