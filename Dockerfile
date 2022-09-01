FROM node:lts-slim as builder

# Setup base directory
WORKDIR /home/app/
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY . .

# Setup lib
WORKDIR /home/app/lib
RUN yarn install --frozen-lockfile
RUN yarn build

# Setup example project
WORKDIR /home/app/example
RUN yarn install --frozen-lockfile

EXPOSE 8585

CMD [ "yarn", "start" ]

