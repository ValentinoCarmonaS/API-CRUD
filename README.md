# API CRUD

![Build Status](https://github.com/ValentinoCarmonaS/API-CRUD/actions/workflows/ci.yml/badge.svg)
[![Code Coverage](https://img.shields.io/badge/coverage-93.75%25-brightgreen)](https://github.com/ValentinoCarmonaS/API-CRUD)

A **RESTful API** built with **Node.js**, **Express**, and **MongoDB**, implementing the **MVC** pattern. It supports **CRUD** operations for user management and includes **JWT authentication** for secure access. Designed for scalability, thoroughly tested, and easy to deploy.

## 🚀 Features
- **CRUD Operations**: Create, read, update, and delete users.
- **Authentication**: Secure endpoints with JWT-based authentication.
- **MongoDB**: NoSQL database integration with MongoDB Atlas.
- **Testing**: Comprehensive tests with Jest and Supertest (93.75% branch coverage).
- **Docker**: Containerized setup for easy deployment.

## 📋 Prerequisites
- **Node.js** v16+
- **Docker** and **Docker Compose** (optional, for containerized setup)
- **MongoDB Atlas** account or local MongoDB instance

## 🛠️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ValentinoCarmonaS/API-CRUD.git
   cd API-CRUD
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/api-crud?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```

## ▶️ Running the API
- **Locally**:
  ```bash
  npm start
  ```
  The API will be available at `http://localhost:3000/api`.

- **With Docker**:
  ```bash
  make build
  make up
  ```
  Stop containers with:
  ```bash
  make down
  ```

## 🧪 Testing
Run tests with Docker:
```bash
make test
```
Or run test with npm:
```bash
npm test
```
- Tests cover authentication, user CRUD, and global middleware logic.
- Coverage: 93.75% branches, 98.64% statements.
- View detailed reports in `coverage/lcov-report/index.html`.

## 📚 API Endpoints
- **Auth**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Authenticate and receive a JWT.
- **Users** (JWT required):
  - `GET /api/users`: List all users.
  - `GET /api/users/:id`: Get a user by ID.
  - `POST /api/users`: Create a user.
  - `PUT /api/users/:id`: Update a user.
  - `DELETE /api/users/:id`: Delete a user.

For detailed endpoint documentation, refer to the [API specification](docs/api-spec.md).

## 🗂️ Project Structure
```
API-CRUD/
├── src/
│   ├── config/         # Database and environment setup
│   ├── controllers/    # Business logic for endpoints
│   ├── middlewares/    # Authentication and validation
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoint definitions
│   ├── tests/          # Jest and Supertest tests
│   └── app.js          # Express app setup
├── .env                # Environment variables
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
├── Makefile            # Automation scripts
└── package.json        # Dependencies and scripts
```

## 📜 License
[MIT](LICENSE)