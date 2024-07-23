#########################
### build environment ###
#########################

# base image
FROM node:18 as builder


# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PATH /usr/src/app/node_modules/@angular/cli/bin:$PATH

# install and cache app dependencies
COPY package-lock.json /usr/src/app/package-lock.json
COPY package.json /usr/src/app/package.json

# add app
COPY . /usr/src/app

RUN npm install
#&& apt-get update && apt-get install iputils-ping
RUN npm run build

CMD ["npm", "run", "start"]
EXPOSE 3000


