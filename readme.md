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

# Run the application NestJS
# Development
$ npm run start

# Production
$ npm run build
$ npm run start:prod
```

## Frontend Project setup

```bash
#Go to directory
$ cd ./frontend

# Install depedency
$ npm install

# Run the application NextJS
# Development
$ npm run dev

# Production
$ npm run build
$ npm run start
```