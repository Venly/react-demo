FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get -y upgrade && apt-get install -y curl \
    && npm install --only=production --omit=dev

CMD ["npm", "run", "buildAndServe"]

EXPOSE 5173
