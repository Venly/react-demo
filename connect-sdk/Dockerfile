# Stage 1: Build Stage
FROM node:lts-bullseye-slim as build

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

RUN echo "Building with VITE_CLIENT_ID=${VITE_CLIENT_ID} and VITE_ENV=${VITE_ENV}"

COPY . .

# Install npm dependencies
RUN echo "Updating package list and installing npm dependencies..." && \
    apt-get update && apt-get -y upgrade && npm install && \
    echo "npm dependencies installed."

# Build the application
RUN echo "Starting the build process..." && \
    npm run build && \
    echo "Build completed successfully."

# Stage 2: Production Stage
FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

# Install curl in the production container
RUN echo "Installing curl in the production container..." && \
    apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* && \
    echo "Curl installed."

# Copy built application and package files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Log the copy action
RUN echo "Application files copied."

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
RUN echo "Installing production dependencies..." && \
    npm install --only=production && \
    echo "Production dependencies installed."

# Log starting the server
RUN echo "Starting the application..."

# Command to run your application using npx to ensure local install
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

EXPOSE 5173