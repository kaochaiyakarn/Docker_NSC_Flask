FROM node:8

# set up angular cli
RUN yarn global add @angular/cli@1.2.6

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install 
COPY . /app

# create watch files
CMD ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy-conf.json
EXPOSE 4200