# Continuous Integration Workflows

This document outlines the GitHub Actions workflows for the project:
1. **CI Workflow** to ensure code builds successfully.
2. **Docker Publish Workflow** to build and push Docker images to Docker Hub.

Both workflows work together to streamline CI/CD and ensure your Kubernetes deployments use up-to-date Docker images.

---

## Workflow 1: Continuous Integration (CI)

### Purpose
- Validate code changes by checking if the project builds successfully.

### Triggers
- Runs on every `push` or `pull request` to the `main` branch.

### Key Steps
1. **Setup Node.js**
   - Installs the required Node.js version.
2. **Install Dependencies**
   - Installs project dependencies using `npm ci`.
3. **Build the Project**
   - Builds the project to ensure there are no compile-time errors.

### Sample Workflow File: `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]

jobs:
  build:
    name: Build and Test
    timeout-minutes: 15
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"


      - name: Install dependencies
        run: npm install

      - name: Run setup script
        run: npm run setup

      - name: Build
        run: npm run build
```

---

## Workflow 2: Docker Publish

### Purpose
- Build and push Docker images to Docker Hub.
- Triggered only if the CI workflow completes successfully.

### Triggers
- Runs after the successful completion of the `CI` workflow on the `main` branch.

### Key Steps
1. **Setup Docker**
   - Logs in to Docker Hub using secrets.
2. **Build Docker Image**
   - Builds the Docker image for the project.
3. **Push Docker Image**
   - Pushes the image to Docker Hub for use in Kubernetes deployments.

### Sample Workflow File: `.github/workflows/docker-publish.yml`
```yaml
name: Docker-Publish

on:
  workflow_run:
    workflows: ["CI"]
    types:
      - completed
    branches:
      - main

jobs:
  web-image:
    name: Build and Publish Docker Image of Web App
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        env:
          VITE_VAPID_PUBLIC_KEY: ${{ secrets.VITE_VAPID_PUBLIC_KEY }}
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./apps/web/Dockerfile
          push: true
          tags: siddpunk/messagepunk-web:latest

  auth-image:
    name: Build and Publish Docker Image of Auth Service
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./apps/auth-service/Dockerfile
          push: true
          tags: siddpunk/messagepunk-auth-service:latest


  db-image:
    name: Build and Publish Docker Image of DB Service
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./apps/db-service/Dockerfile
          push: true
          tags: siddpunk/messagepunk-db-service:latest

  file-image:
    name: Build and Publish Docker Image of File Service
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./apps/file-service/Dockerfile
          push: true
          tags: siddpunk/messagepunk-file-service:latest

  notification-image:
    name: Build and Publish Docker Image of Notification Service
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./apps/notification-service/Dockerfile
          push: true
          tags: siddpunk/messagepunk-notification-service:latest

  socket-image:
    name: Build and Publish Docker Image of Socket Service
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
            fetch-depth: 2

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
            node-version: 20
            cache: "npm"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
            username: ${{ secrets.DOCKERHUB_USERNAME }}
            password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
            context: .
            file: ./apps/socket-service/Dockerfile
            push: true
            tags: siddpunk/messagepunk-socket-service:latest

```

---

## How It Works
1. **CI Workflow**
   - Automatically triggered on code updates.
   - Ensures the project builds successfully before proceeding further.

2. **Docker Publish Workflow**
   - Runs only if the `CI` workflow completes successfully.
   - Publishes updated Docker images to Docker Hub.

---

## Setting Up Secrets
- Add your Docker Hub credentials as GitHub secrets:
  - **DOCKER_USERNAME**: Your Docker Hub username.
  - **DOCKERHUB_TOKEN**: Your Docker Hub access token or password.

## Benefits
- Ensures high code quality by validating builds.
- Automates Docker image publishing for seamless Kubernetes deployment.


