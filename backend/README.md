# How to start

## Full application in Docker
#### In backend folder: 
    docker compose -f docker-compose.yml up --build

## Only DB (for faster development)
#### In backend folder:
    docker compose -f docker-compose.dev.yml up -d db