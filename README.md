# Express.js + TypeScript API with React Frontend

A full-stack application with Express.js TypeScript backend and React frontend, containerized and ready for Kubernetes deployment.

## Architecture

- **Backend**: Express.js + TypeScript API with CORS, Helmet, and health checks
- **Frontend**: React + TypeScript with modern hooks and error handling
- **Containerization**: Docker for both frontend and backend
- **Orchestration**: Kubernetes manifests with auto-scaling and ingress

## Features

### Backend API
- ✅ TypeScript with strict type checking
- ✅ RESTful API endpoints for user management
- ✅ CORS and security middleware
- ✅ Health check endpoint
- ✅ Error handling and validation
- ✅ Docker containerization
- ✅ Kubernetes deployment with HPA

### Frontend
- ✅ React with TypeScript
- ✅ Modern hooks (useState, useEffect)
- ✅ API integration with error handling
- ✅ Responsive design
- ✅ Docker multi-stage build
- ✅ Nginx production server

### Kubernetes Features
- ✅ Horizontal Pod Autoscaler (HPA)
- ✅ Health checks and probes
- ✅ Resource limits and requests
- ✅ Ingress configuration
- ✅ Service discovery

## Quick Start

### Development

1. **Start the API**:
   \`\`\`bash
   cd api
   npm install
   npm run dev
   \`\`\`

2. **Start the Frontend**:
   \`\`\`bash
   cd frontend
   npm install
   npm start
   \`\`\`

### Docker Build

1. **Build API**:
   \`\`\`bash
   cd api
   docker build -t express-api:latest .
   \`\`\`

2. **Build Frontend**:
   \`\`\`bash
   cd frontend
   docker build -t react-frontend:latest .
   \`\`\`

### Kubernetes Deployment

1. **Deploy API**:
   \`\`\`bash
   kubectl apply -f k8s/api-deployment.yaml
   kubectl apply -f k8s/api-hpa.yaml
   \`\`\`

2. **Deploy Frontend**:
   \`\`\`bash
   kubectl apply -f k8s/frontend-deployment.yaml
   \`\`\`

3. **Setup Ingress**:
   \`\`\`bash
   kubectl apply -f k8s/ingress.yaml
   \`\`\`

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

### API
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `REACT_APP_API_URL` - API base URL

## Scaling

The API is configured with Horizontal Pod Autoscaler that scales based on:
- CPU utilization (70% threshold)
- Memory utilization (80% threshold)
- Min replicas: 2
- Max replicas: 10

## Production Considerations

1. **Database**: Replace in-memory storage with a proper database
2. **Authentication**: Add JWT or session-based auth
3. **Logging**: Implement structured logging
4. **Monitoring**: Add Prometheus metrics
5. **Security**: Implement rate limiting and input validation
6. **SSL/TLS**: Configure HTTPS in production
