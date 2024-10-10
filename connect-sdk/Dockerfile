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
RUN apt-get update && apt-get -y upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y npm

# Build the application
RUN VITE_CLIENT_ID=${VITE_CLIENT_ID} VITE_ENV=${VITE_ENV} npm run build

# Stage 2: Production Stage
FROM --platform=linux/arm64 node:lts-bullseye-slim

WORKDIR /usr/src/app

# Install curl in the production container
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy built application and package files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Set Environment Variables for Datadog in the final container
ARG VERSION
ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ARG VITE_CLIENT_ID
ARG VITE_ENV

ENV VERSION=${VERSION}
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL}
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}
ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_ENV=${VITE_ENV}

# Install only production dependencies
RUN DEBIAN_FRONTEND=noninteractive npm install --only=production

# Set DEBUG environment variable for verbose logging
ENV DEBUG=serve:*

# Command to run your application with verbose logging via DEBUG
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

EXPOSE 5173