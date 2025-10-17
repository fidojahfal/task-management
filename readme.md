## Backend Project setup

```bash
#Go to directory
$ cd ./backend

# Install depedency
$ npm install

# Copy file environment
$ cp .env.example .env

# Run container Docker (MySql)
$ docker-compose up -d

# Generate prisma client
$ npx prisma generate

# Run database migration
$ prisma migrate dev

# Run script for ingest document ground truth
$ npx ts-node src/common/scripts/ingest-documents.ts

# Run the application NestJS
# Development
$ npm run start

# Production
$ npm run build
$ npm run start:prod
```