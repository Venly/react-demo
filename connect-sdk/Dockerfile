# Stage 1: Build Stage
FROM --platform=linux/arm64 node:lts-bullseye-slim as build

WORKDIR /usr/src/app

# Set Arguments for Application
ARG VITE_CLIENT_ID
ARG VITE_ENV

# Set Arguments for Datadog
ARG VERSION=0.0.0
ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA

# Set Environment Variables for Datadog
ENV VERSION=${VERSION}
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

# Set Environment Variables for Application
ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_ENV=${VITE_ENV}

COPY . .

# Install npm dependencies
RUN apt-get update && apt-get -y upgrade && apt-get install -y curl \
    && npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM --platform=linux/arm64 node:lts-bullseye-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Command to run your application using npx to ensure local install
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

EXPOSE 3000
