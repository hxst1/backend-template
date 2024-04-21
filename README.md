# Backend

This project is the backend of [Project or System Name], built with Koa and TypeScript, using Prisma as an ORM to interact with a PostgreSQL database hosted in Docker.

## Project Structure

Here's an overview of the main structure of the project:

- `src/`: Source code folder for the application.
    - `db/`: Contains Prisma configuration and migrations.
    - `server/`: Server logic and Koa middlewares.
    - `types/`: Custom TypeScript types and interfaces.
    - `index.ts`: Main entry point of the application.
- `node_modules/`: Project dependencies (not uploaded to the repository).
- `docker-compose.yml`: Configuration to deploy related services, including the database.
- `.env`: Environment variables (this file should not be uploaded to the repository).
- `package.json` & `yarn.lock`: Project configuration and dependency locking.
- `tsconfig.json`: TypeScript configuration file.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (LTS version recommended)
- Yarn (package manager)
- Docker Desktop (for Docker users)
- Prisma CLI (installed as a dev dependency)
- PostgreSQL (if not using Docker)

## Initial Setup

1. **Clone the Repository**

   ```sh
   git clone [Repository URL] && cd backend
   ```
   
2. **Install Dependencies**

   ```sh
    yarn install
    ```
   
3. **Set Up Environment Variables**

    Copy the .env.example file to .env and fill it with your environment credentials:
    
    ```sh
    cp .env.example .env
    ```
    
    Edit the .env file with the appropriate configurations for the database and any other necessary environment variables.

4. **Start the Database**

    ```sh
     docker-compose up -d db
    ```
    
     This will spin up a Docker container running PostgreSQL and make it accessible through port 5432.

5. **Apply Prisma Migrations**

    ```sh
    yarn prisma migrate dev
    ```
    
    This will apply the Prisma migrations to the database, creating the necessary tables.

6. **Start the Server**

    ```sh
    yarn dev
    ```
   
    This will start the server in development mode, with hot-reloading enabled.

7. **Contributing to the Project**

    If you wish to contribute to the project, make sure to follow the [contribution guidelines](CONTRIBUTING.md).
