# AI Agents Tool

A full-stack application with Express.js TypeScript backend and React Native frontend, designed to assist people with diseases that cause brain degeneration, providing a visual and contextualized record of their daily experiences.

## About the Project
The "AI Agents Tool" aims to support people with neurodegenerative diseases such as Alzheimer's by offering a distributed system to automatically record and summarize everyday events through images and AI.
The relevance of the problem, scientific references and documentation of pain are detailed in [`validacao_problema.md`](./documentation/validacao_problema.md) e [`doc_arquitetonica.md`](./documentation/doc_arquitetonica.md).

## Architecture

- **Backend**: Express.js + TypeScript microservices with CORS, Helmet, and health checks.
- **Frontend**: React Native with hooks and error handling.
- **Containerization**: Docker for backend microservices.
- **Orchestration**: PM2 to manage and keep Node.js microservice processes online.

## Features

### Backend (Microservices)
- ✅ TypeScript with strict type checking
- ✅ RESTful endpoints for image processing, geocoding, and summarization
- ✅ CORS and security middleware
- ✅ Health check endpoints
- ✅ Error handling and validation
- ✅ Docker containerization

### Frontend
- ✅ React Native with TypeScript
- ✅ Modern hooks (useState, useEffect)
- ✅ API integration and error handling
- ✅ Responsive design

## Quick Start

### Development

To start the microservices and frontend in development environment:

1.  **Start Microservices (Image Categorizer, Geocoding, Summarizer):**
    For each microservice (located in `api`,`image-categorizer`, `geocoding`, `summarizer`):
    ```bash
    cd <microservice-name>
    npm install
    npm run dev
    ```
    Make sure each microservice is running on a different port, as configured in their respective `.env` files.

2.  **Start Frontend:**
    ```bash
    cd frontend
    npm install
    npm start
    ```

### Docker Build

To build Docker images for the microservices:

1.  **Build Image Categorizer:**
    ```bash
    cd image-categorizer
    docker build -t image-categorizer:latest .
    ```

2.  **Build Geocoding Service:**
    ```bash
    cd geocoding
    docker build -t geocoding-service:latest .
    ```

3.  **Build Summarizer Service:**
    ```bash
    cd summarizer
    docker build -t summarizer-service:latest .
    ```

4.  **Build api Service:**
    ```bash
    cd api
    docker build -t api-service:latest .
    ```

## API Endpoints

- **Image Categorizer**: `POST /` (for image upload and categorization)
- **Geocoding Service**: `GET /query?latitude=<lat>&longitude=<lon>` (to get location by coordinates)
- **Summarizer Service**: `POST /` (to generate summarized reports)

## Environment Variables

### Microservices (Image Categorizer, Geocoding, Summarizer)
- `PORT` - Server port (e.g., 3001, 3002, 3003)
- `NODE_ENV` - Environment (development/production)
- `IMAGGA_API_KEY` - Imagga API key (for Image Categorizer)
- `IMAGGA_API_SECRET` - Imagga API secret (for Image Categorizer)
- `GEOCODING_API_KEY` - Geocoding API key (for Geocoding Service)

### Frontend
- `REACT_APP_API_URL` - Base API URL (for the frontend to communicate with the microservices)

## Production Considerations

1.  **Database**: Replace in-memory storage with a persistent database.
2.  **Authentication**: Add JWT or session-based authentication.
3.  **Logging**: Implement structured logging.
4.  **Monitoring**: Add monitoring metrics.
5.  **Security**: Implement rate limiting and input validation.
6.  **SSL/TLS**: Configure HTTPS in production.