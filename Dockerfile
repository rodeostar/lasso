FROM node:lts-slim as builder


# update packages, to reduce risk of vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y

# set a non privileged user to use when running this image
RUN groupadd -r nodejs && useradd -g nodejs -s /bin/bash -d /home/nodejs -m nodejs
USER nodejs

# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/lib
COPY --chown=nodejs:nodejs lib/ .

WORKDIR /home/nodejs/app

# default env
ARG NODE_ENV=production

# override env
ENV NODE_ENV=${NODE_ENV}

# get package.json
COPY --chown=nodejs:nodejs example/package.json .
RUN yarn install --frozen-lockfile

COPY --chown=nodejs:nodejs example/ example/

EXPOSE 3000

CMD [ "yarn", "start" ]

