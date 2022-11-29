FROM node:16-alpine

WORKDIR /api

RUN rm -rf node_modules/

# add app
COPY package*.json ./

RUN if ["$NODE_ENV" = "development"]; \
  then npm ci; \
  else npm ci --only=production; \
  fi

# COPY package*.json .
COPY . ./

ENV PORT 3001

EXPOSE ${PORT}

CMD ["node", "server.ts"]