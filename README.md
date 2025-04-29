# Task Management Application (Server Side)

## Overview

This repository contains the **Server Side** of a simple **Task Management Application** built as part of an onboarding exercise. The application allows users to manage a list of tasks with the following fields:

- **id**: Auto-incremental identifier.
- **title**: Required string field.
- **description**: Optional string field.
- **status**: Enum with values: `pending`, `in progress`, `done`.

The **Client Side** of this application is available in the following repository:  
[https://github.com/aghmnl/compiti-client](https://github.com/aghmnl/compiti-client)
The server is implemented using the following technologies:

- **tRPC:** For building type-safe APIs easily consumed by the client.
- **Prisma:** ORM for database interaction (compatible with SQLite, PostgreSQL, etc.).
- **Zod:** For schema definition and validation, ensuring data integrity and shared types with the client.
- **Clerk:** For handling authentication and protecting API routes.

## Features

The server provides the following API functionalities via tRPC:

1.  **Create Task:** Add a new task to the database.
2.  **Get Tasks:** Retrieve the list of all tasks for the authenticated user.
3.  **Update Task:** Modify an existing task's details (title, description, status).
4.  **Delete Task:** Remove a task from the database.
5.  **Authentication Middleware:** Ensures only authenticated users can access task operations.
6.  **Input Validation:** Uses Zod schemas (shared with the client) to validate incoming data.

## Documentation Used

The following official documentation was referenced during development:

- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)

## Objectives Achieved

This repository fulfills the following objectives:

- Implements a fully functional backend API for the Task Management CRUD application.
- Utilizes tRPC for efficient and type-safe client-server communication.
- Integrates Prisma for database operations.
- Secures endpoints using Clerk authentication.
- Demonstrates code sharing (types/schemas) with the client via a local dependency setup.
- Follows best practices for code organization (e.g., separating routers, procedures, context).

## Installation and Local Setup

Follow these steps to install and run the server application locally. **Remember the required folder structure mentioned in the Overview.**

### Prerequisites

- Node.js (v16 or higher recommended, matching the client)
- npm

### Steps

1.  **Clone both repositories** into the same parent directory:

    ```bash
    # Navigate to your desired parent directory
    cd path/to/your/ParentFolder

    # Clone the server (this repo)
    git clone https://github.com/aghmnl/compiti-server

    # Clone the client
    git clone https://github.com/aghmnl/compiti-client

    # Navigate into the server directory
    cd compiti-server
    ```

2.  **Install server dependencies**

    ```bash
    npm install
    ```

    > (Note: The client will install this server repo as a dependency separately using `npm install ../compiti-server` from its own directory).

3.  **Set up environment variables**

- Create a `.env` file in the root of the `compiti-server` directory.
- Add the following variables, replacing placeholder values with your actual configuration:

  ```plaintext
  # Your database connection string for SQLite
  DATABASE_URL="file:./dev.db"

  # Specify the port and the url of the server
  PORT="4000"
  SERVER_URL="http://localhost:4000"
  ```

4.  **Set up the database**

- Run Prisma migrations to create the database schema based on `prisma/schema.prisma`:

  ```bash
  npx prisma migrate dev --name init
  ```

  _(This will also generate the Prisma Client)_

5.  **Run the development server**

    ```bash
    npm run dev
    # or
    # yarn dev
    ```

6.  **Server is Running**

- The server should now be running on `http://localhost:4000`.
- It listens for requests from the client application (running on `http://localhost:3000`). You generally won't interact with the server directly via your browser, but through the client UI.
- You can test the server using `Postmant`, `Insomnia` or any other similar tool.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes. Ensure any changes consider the dependency relationship with the `compiti-client` repository.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
