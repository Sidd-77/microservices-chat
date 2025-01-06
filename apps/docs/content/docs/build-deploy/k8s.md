# Deploying the Application to Kubernetes

This guide outlines the steps to deploy the application on Kubernetes, using the provided YAML manifests. The setup supports both standard Kubernetes clusters and Minikube for local testing.

## Prerequisites

1. **Kubernetes Cluster**
   - A working Kubernetes cluster (e.g., Minikube, Docker Desktop, or a cloud provider).
2. **kubectl CLI**
   - Ensure `kubectl` is installed and configured to interact with your cluster.
3. **Docker Hub Access**
   - All Docker images are publicly available on Docker Hub. Ensure you have internet access to pull these images.


## Deploying to Kubernetes

### 1. Clone the Repository
```bash
git clone https://github.com/Sidd-77/microservices-chat.git
cd microservices-chat
```

### 2. Configure Secrets
- **Create Kubernetes Secrets:** Copy the example secrets file:
  ```bash
  cp k8s/secrets.example.yml k8s/secrets.yml
  ```
- **Edit `secrets.yml`:** Replace placeholders with appropriate values, such as database credentials, API keys, and S3 access keys.
- **Apply Secrets:**
  ```bash
  kubectl apply -f k8s/secrets.yml
  ```

### 3. Install NGINX Ingress Controller
- For routing traffic, install the NGINX ingress controller:
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
  ```
- Verify the ingress controller is running:
  ```bash
  kubectl get pods -n ingress-nginx
  ```

### 4. Deploy Dependencies
Each dependency has its own deployment and service YAML file. Deploy them as follows:

- **Deploy RabbitMQ:**
  ```bash
  kubectl apply -f k8s/rabbitmq.yml
  ```
- **Deploy Redis:**
  ```bash
  kubectl apply -f k8s/redis.yml
  ```
- **Deploy MinIO:**
  ```bash
  kubectl apply -f k8s/minio.yml
  ```
- **Deploy MongoDB:**
  ```bash
  kubectl apply -f k8s/mongo.yml
  ```

### 5. Deploy Services
Each microservice also has its own deployment and service YAML file. Deploy them as follows:

- **Auth Service:**
  ```bash
  kubectl apply -f k8s/auth-service.yml
  ```
- **DB Service:**
  ```bash
  kubectl apply -f k8s/db-service.yml
  ```
- **File Service:**
  ```bash
  kubectl apply -f k8s/file-service.yml
  ```
- **Notification Service:**
  ```bash
  kubectl apply -f k8s/notification-service.yml
  ```
- **Socket Service:**
  ```bash
  kubectl apply -f k8s/socket-service.yml
  ```
- **Web Frontend:**
  ```bash
  kubectl apply -f k8s/web.yml
  ```

### 6. Configure Ingress
- Apply the ingress configuration to route traffic:
  ```bash
  kubectl apply -f k8s/ingress.yml
  ```
- Verify ingress is working:
  ```bash
  kubectl get ingress
  ```
  Ensure external IPs or hostnames are assigned.

### 7. Verify Deployment
- Check pods' status:
  ```bash
  kubectl get pods
  ```
- Access logs for debugging:
  ```bash
  kubectl logs <pod-name>
  ```
- Test the application by accessing the exposed endpoints.

## Running in Minikube

### Additional Steps for Minikube

1. **Start Minikube:**
   ```bash
   minikube start
   ```
2. **Enable Ingress Controller:**
   ```bash
   minikube addons enable ingress
   ```
3. **Install NGINX Ingress Controller:**
   Use the following command to ensure ingress works locally:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
   ```
4. **Expose Services:**
   Since Minikube runs locally, expose services for testing:
   ```bash
   minikube service <service-name>
   ```
5. **Access Application:**
    Use `minikube tunnel` to expose the services:
    ```bash
    minikube tunnel
    ```
    This command will create a network route to access the services using their cluster IPs and ports.

### Tips for Minikube
- Use the `--memory` and `--cpus` flags to allocate sufficient resources:
  ```bash
  minikube start --memory=4g --cpus=2
  ```
- Use the Minikube dashboard to monitor resources:
  ```bash
  minikube dashboard
  ```


