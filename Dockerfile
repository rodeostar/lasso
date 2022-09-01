FROM node:lts-slim as builder


WORKDIR /home/app/

# default env
ARG NODE_ENV=production

# override env
ENV NODE_ENV=${NODE_ENV}

# get package.json
COPY . .


WORKDIR /home/app/lib
RUN yarn install --frozen-lockfile
RUN yarn build

WORKDIR /home/app/example
RUN yarn install --frozen-lockfile

EXPOSE 8585

CMD [ "yarn", "start" ]

