FROM node:8.9

# Override the base log level (info)
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN [ "mkdir", "-p", "/usr/src/app" ]
WORKDIR /usr/src/app

ENV PORT=3000
EXPOSE 3000

# Install all dependencies of the current project
COPY package*.json /usr/src/app/
RUN [ "npm", "install" ]

# Copy local files into the image
COPY public    /usr/src/app/public
COPY src       /usr/src/app/src
COPY server.js /usr/src/app/server.js

# Build for production.
RUN [ "npm", "run", "build", "--production" ]

CMD [ "npm", "start" ]
