
# Setting Up the Project Locally for Developement

Follow these steps to set up the project on your local machine:

## Prerequisites
- **Node.js (>=18)**
- **Docker and Docker Compose**

## Steps

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Sidd-77/microservices-chat.git
    cd microservices-chat
    ```

2. **Install Dependencies:**
    Install all dependencies in the root and subdirectories:
    ```bash
    npm install
    ```

3. **Run Setup Script:**
    Execute the setup script to configure the environment:
    ```bash
    node setup.js
    ```

4. **Build Project:**
    Build the services and models needed:
    ```bash
    npm run build
    ```

5. **Start Dependencies Locally:**
    Use Docker Compose to start dependencies like Redis, RabbitMQ, MongoDB and MinIO:
    ```bash
    docker-compose -f docker-compose-dependencies.yml up -d
    ```

6. **Run the Application:**
    Start the application using npm:
    ```bash
    npm run dev
    ```

> **Note for Notification Service:**
> To enable the push-notification service, generate a VAPID key pair and place it in the environment files of both the `web` and `notification-service` directories.
