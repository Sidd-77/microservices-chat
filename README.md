# Project Introduction

This project is a modern microservices-based application designed to showcase proficiency in advanced software architecture and DevOps practices. It leverages **TypeScript** and cutting-edge technologies such as **Docker**, **Kubernetes**, **Redis Pub/Sub**, **RabbitMQ**, and **MinIO** for building scalable and maintainable solutions.

## Key Features
- **Microservices Architecture:** The application consists of modular services that are independently deployable and scalable.
- **Message Queues:** Asynchronous communication is enabled through RabbitMQ.
- **Redis Pub/Sub:** Facilitates real-time updates and inter-service communication.
- **Kubernetes:** Ensures orchestration of microservices for scalable deployment.
- **MinIO:** Provides S3-compatible file storage.
- **Turborepo:** Manages the monorepo, allowing shared configurations and code reuse.


## Architecture
![diagram-export-1-6-2025-1_05_00-PM](https://github.com/user-attachments/assets/28e39518-45d0-42e4-be7a-a45fe75a0b8c)


## Directory Structure
```
├── apps
│   ├── auth-service          # Handles authentication and authorization
│   ├── db-service            # Database-related tasks and abstraction
│   ├── docs                  # Documentation for the project
│   ├── file-service          # File upload and management
│   ├── notification-service  # Notifications using custom WAPT-based system
│   ├── socket-service        # Real-time communication using Socket.IO
│   └── web                   # Frontend application using RailJS
├── docker-compose-dependencies.yml # Docker dependencies for local setup
├── docs                      # Service-specific documentation
├── k8s                       # Kubernetes manifests for services
├── packages
│   ├── eslint-config         # Shared ESLint configuration
│   ├── models                # Shared models for microservices
│   └── typescript-config     # Shared TypeScript configuration
├── setup.js                  # Setup script for local environment
├── turbo.json                # Turborepo configuration
```


