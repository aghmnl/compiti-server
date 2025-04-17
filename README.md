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

- **tRPC** for communication between the backend and frontend.
- **Prisma** (ORM with SQLite or PostgreSQL) for database management.
- **Zod** for schema validation on both client and server.

## Features

The server includes the following functionalities:

1. Create a new task.
2. View the list of tasks.
3. Edit an existing task.
4. Delete a task.
5. Server-side validation using Zod.

## Documentation Used

The following official documentation was used during the development process:

- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)

## Objectives Achieved

This repository fulfills the following objectives:

- Implements a modular structure for API routes and validations.
- Follows best practices for code organization (e.g., separation of API route handlers and validations).
- Provides a fully functional backend for the CRUD application.

## Installation and Local Setup

Follow these steps to install and run the application locally:

### Prerequisites

- Node.js (I use v22.14.0)
- npm (I use 11.3.0)
- typescript (I use 5.8.3)
- SQLite or PostgreSQL (for the database)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/aghmnl/compiti-server
   cd <repository-folder>
   ```

2. **Install dependencies**

   ```bash
    npm install
   ```

3. **Set up environment variables**

- Create a .env file in the root directory.
- Add the following variables:
  ```
  DATABASE_URL="your-database-url"
  ```

4. **Set up the database**

- Run Prisma migrations to create the database schema:

  ```bash
  npx prisma migrate dev
  ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**

- Open your browser and navigate to http://localhost:3000.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
