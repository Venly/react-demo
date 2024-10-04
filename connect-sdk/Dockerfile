# Stage 1: Build Stage
FROM node:lts-bullseye-slim as build

WORKDIR /usr/src/app

ARG VITE_CLIENT_ID
ARG VITE_ENV

ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_ENV=${VITE_ENV}

COPY . .

# Install npm dependencies
RUN apt-get update && apt-get -y upgrade && apt-get install -y curl \
    && npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Command to run your application using npx to ensure local install
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

EXPOSE 3000
