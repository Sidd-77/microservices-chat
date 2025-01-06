# Project Architecture Overview

This project follows a modern microservices architecture, leveraging distributed systems principles and cutting-edge technologies to achieve scalability, maintainability, and real-time communication. Below is an overview of the key components and their functions.

## Architecture Diagram
![diagram-export-1-6-2025-1_05_00-PM](https://github.com/user-attachments/assets/28e39518-45d0-42e4-be7a-a45fe75a0b8c)

## Services Overview

### 1. **Auth Service**
   - **Purpose:** Handles user authentication and authorization using JWT.
   - **Key Features:** Manages user registration, login, and token validation.

### 2. **DB Service**
   - **Purpose:** Acts as an abstraction layer for database operations.
   - **Key Features:** Handles CRUD operations and manages schema consistency.
   - **Integration:** Works closely with the Socket Service via a message queue to store messages asynchronously.

### 3. **File Service**
   - **Purpose:** Manages file uploads and storage using MinIO.
   - **Key Features:** Provides an S3-compatible interface for storing and retrieving files securely.

### 4. **Notification Service**
   - **Purpose:** Handles web-push notifications sent to users using VAPID.
   - **Key Features:** Integrates with the Socket Service via a message queue to deliver notifications in real-time.

### 5. **Socket Service**
   - **Purpose:** Enables real-time communication using Socket.IO.
   - **Key Features:** Implements Redis Pub/Sub for scaling multiple socket instances seamlessly and integrates with other services for message and notification delivery.

### 6. **Web**
   - **Purpose:** The frontend application built with ReactJs and hosted using Nginx.
   - **Key Features:** Acts as the primary user interface, interacting with backend services via APIs.

## Shared Packages

### **Models Package**
   - **Purpose:** Provides shared TypeScript models and Mongoose schema for consistent data structures across all services.
   - **Key Features:** Reduces redundancy and ensures data integrity by using a single source of truth for schema definitions.

### **Other Packages**
   - **ESLint Config:** Shared linting configuration to maintain consistent code quality.
   - **TypeScript Config:** Centralized TypeScript configurations to standardize build settings.

## NGINX Ingress

- **Role:** Acts as the traffic router, exposing services externally and directing requests to the appropriate microservices.
- **Key Features:**
  - Provides load balancing across multiple instances of a service.

## Communication Between Services

### **Message Queues**
- **Technology Used:** RabbitMQ
- **Usage:**
  - **Socket Service ↔ DB Service:** Messages sent in real-time are stored asynchronously in the database via RabbitMQ.
  - **Socket Service ↔ Notification Service:** Notifications are queued and delivered to users through RabbitMQ for reliability and scalability.

### **Redis Pub/Sub**
- **Technology Used:** Redis
- **Usage:**
  - Enables horizontal scaling of the Socket Service by broadcasting events across multiple instances.
  - Ensures real-time updates are consistent and efficient, even under heavy load.

## Key Advantages
- **Scalability:** Redis Pub/Sub allows scaling Socket Service with ease, and Kubernetes ensures the entire application can scale horizontally.
- **Resilience:** Message queues provide reliable communication, ensuring no data is lost during high load.
- **Modularity:** Services are independent, making development and deployment more flexible.
- **Real-Time Communication:** Socket.IO and Redis enable instantaneous data delivery, improving user experience.


