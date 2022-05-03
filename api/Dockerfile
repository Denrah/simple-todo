FROM docker
COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM node:16

ARG BUILD_DATE
ARG BUILD_COMMIT

LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.build-commit=$BUILD_COMMIT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js .
COPY package-lock.json .
COPY package.json .
COPY wait-for-it.sh .

RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]

EXPOSE 3000

CMD [ "node", "index.js" ]
