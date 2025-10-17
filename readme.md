## Description Project

A task management apps for helping employees to manage dan monitor daily task.

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

# Technology

Frontend:

- Nextjs
- Bootstrap
- React Bootstrap

Backend:

- NestJs
- Zod
- JWT
- Prisma ORM
- Docker

# Dummy login

- username: user3
- password: asdasd123

# Database Structure

### Login

| Column   | Type         | Constraint                  |
| -------- | ------------ | --------------------------- |
| user_id  | Int          | Primary Key, Auto Increment |
| name     | Varchar(100) | Not Null                    |
| username | Varchar(100) | Unique, Not Null            |
| password | Varchar(255) | Not Null                    |

### Task

| Column      | Type         | Constraint                  |
| ----------- | ------------ | --------------------------- |
| task_id     | Int          | Primary Key, Auto Increment |
| user_id     | Int          | Not Null                    |
| title       | Varchar(100) | Unique, Not Null            |
| description | Varchar(255) | Not Null                    |
| status      | Varchar(50)  | Not Null                    |
| deadline    | DateTime     | Not Null                    |
| created_by  | Int          | Foreign Key, Not Null       |

# Screenshot

![alt text](https://github.com/fidojahfal/task-management/blob/main/screenshot/dashboard.png?raw=true)