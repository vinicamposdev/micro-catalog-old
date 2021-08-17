FROM node:16-alpine

RUN apk add --no-cache bash git

RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc

RUN npm cache clean --force

RUN mkdir -p /home/node/app/.npm-cache

RUN chmod -R 777 /home/node

RUN npm config set unsafe-perm true

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm install -g nodemon
RUN npm install -g @loopback/cli

USER node

WORKDIR /home/node/app

COPY . /home/node/app

RUN cd /home/node/app && npm install

