# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN rm -rf node_modules/

# add app
COPY package*.json ./

# install app dependencies
RUN npm ci

# ADD SOURCE FILES
COPY . ./

# install react-scripts for github CI 
# RUN npm i react-scripts

# start app
CMD ["npm", "start"]