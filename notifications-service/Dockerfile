FROM node:18-alpine

WORKDIR /notifications

RUN rm -rf node_modules/

# add app
COPY package*.json ./

# Not necessary since we use Dockerfile.prod but adds a double check on container build
RUN if ["$NODE_ENV" = "development"]; \
  then npm ci; \
  else npm ci --only=production; \
  fi

# COPY package*.json .
COPY . ./

ENV PORT 3002

EXPOSE ${PORT}

CMD ["node", "server.ts"]