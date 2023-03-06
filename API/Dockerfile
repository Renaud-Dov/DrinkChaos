FROM node:16-alpine
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
RUN npm install typescript
COPY . .
RUN npx tsc

EXPOSE 3000
ENV HOSTNAME='0.0.0.0'
CMD [ "node","src/main.js" ]
