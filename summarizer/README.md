
# Microserviço de Relatórios Visuais (Summarizer) – Segundo Agente

## Visão Geral

Este microserviço faz parte de um sistema distribuído para auxílio a pessoas com doenças degenerativas cerebrais. A partir de informações relevantes de uma imagem (tags, categorias, coordenadas) via integração com o primeiro agente (API), gera um relatório visual descritivo utilizando IA através do **OpenRouter** (modelo `meta-llama/llama-3-70b-instruct`).

## Arquitetura do Sistema

O sistema distribuído possui três principais componentes:

1. **Primeiro Agente (API):** Recebe imagens, extrai tags, categorias e metadados usando a API da Imagga.
2. **Segundo Agente (Summarizer):** Gera relatórios objetivos a partir dos dados estruturados extraídos do primeiro agente.
3. **Frontend:** Interface para interação do usuário/cuidador.

### Fluxo de Dados

1. O usuário envia uma imagem.
2. O primeiro agente extrai as informações (tags, categorias, coordenadas).
3. O segundo agente gera o relatório visual com base nesses dados.
4. O relatório é apresentado ao usuário ou cuidador.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no backend.
- **Express.js:** Framework web para Node.
- **TypeScript:** Superset do JavaScript com tipagem estática.
- **Axios:** HTTP client para requisições REST.
- **Multer:** Upload de arquivos (multipart/form-data).
- **FormData:** Criação de formulários para envio de arquivos entre microserviços.
- **OpenRouter API:** Serviço de IA para geração do relatório com Llama 3.

## Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker (opcional)
- Conta no [OpenRouter](https://openrouter.ai/) e chave de API

### Instalação Local

1. **Clone o repositório** e entre na pasta do summarizer:

    ```bash
    git clone <url>
    cd summarizer
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**

    Edite `.env` ou configure as seguintes variáveis:

    - `PORT=3002`
    - `API_URL=http://api:3001/test` (ou endpoint do seu primeiro agente)
    - `OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions`
    - `OPENROUTER_API_KEY=sk-...` (sua chave do OpenRouter)

4. **Compile o projeto TypeScript:**

    ```bash
    npm run build
    ```

5. **Execute o microserviço:**

    ```bash
    npm start
    ```

### Instalação com Docker

1. **Build da imagem:**

    ```bash
    docker build -t summarizer:latest .
    ```

2. **Execute o container:**

    ```bash
    docker run -p 3002:3002 --env-file .env summarizer:latest
    ```

### Kubernetes

- Utilize os arquivos de deployment e service (`summarizer-deployment.yaml`, `summarizer-service.yaml`).

## API Endpoint

### POST /summarize/generate-report

Gera um relatório visual objetivo a partir da imagem fornecida.

**Request (form-data):**
- `image`: Arquivo de imagem (campo obrigatório)
- `categorizerId`: string (opcional)

**Response (200):**
```json
{
  "summary": "Relatório gerado...",
  "tags": ["sky", "water", ...],
  "categories": ["outdoor", "nature"],
  "coordinates": {"latitude": ..., "longitude": ...}
}
```

## Prompt Utilizado para a IA

O microserviço gera o seguinte prompt:

```
You are an expert in objective visual reports.
Given just the list of tags, categories and coordinates extracted from an image, generate a clear, straightforward report based on that data alone.
- Tags: ...
- Categories: ...
- Coordinates: ...
Do not add information or interpretations that are not explicitly in the tags or categories provided. Avoid any speculation or creative description. Describe it simply for someone who cannot see the image.
```