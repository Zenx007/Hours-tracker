# Comparative Study: Clean Architecture (Reference Implementation)

This repository contains the **"Target"** implementation for an academic scientific study. The purpose of this research is to comparatively analyze the impacts of software architecture on **maintainability, security, scalability, and performance** of backend applications.

This version utilizes **Clean Architecture** with **NestJS**, serving as the ideal development model, focused on decoupling and Design Patterns.

## 🧪 Research Context

In modern software development, the choice of architecture directly impacts the product lifecycle. This study confronts two approaches for the same problem domain (HoursRecord):

1.  **Clean Architecture (This Repository):** Focused on the Dependency Rule, Inversion of Control, and Separation of Concerns.
2.  **Coupled MVC/Anti-pattern:** Focused on rapid development without architectural concern ("spaghetti code").

### ✅ Objectives of This Implementation
To practically demonstrate the benefits of:
* **Isolation:** The *Core* of the application does not depend on frameworks or databases.
* **Security:** Strict use of VOs (View Objects) and DTOs to avoid exposing Database Entities directly.
* **Testability:** Use of Dependency Injection to facilitate Mocks.
* **Error Handling:** Use of the `Result` pattern (Railway Oriented Programming) instead of uncontrolled exceptions.

## 🛠️ Technologies and Patterns

* **Framework:** [NestJS](https://nestjs.com/)
* **Language:** TypeScript
* **ORM:** TypeORM (Abstracted by Repositories)
* **Mapping:** AutoMapper (@automapper/core)
* **Documentation:** Swagger (OpenAPI)
* **Architecture:**
    * *Core/Entities:* Pure business rules.
    * *Core/Services:* Use cases.
    * *Infrastructure:* Database implementation.
    * *Communication:* Controllers and View Objects.

## 🚀 How to Run

### Prerequisites
* Node.js (v16 or higher)
* PostgreSQL

### Installation

1.  Clone the repository and install dependencies:
    ```bash
    npm install
    ```

2.  Configure the `.env` file in the root (use `.env.example` as a base):
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_NAME=clean_arch_db
    ```

3.  Run the project:
    ```bash
    # Development
    npm run start:dev
    ```

4.  Access the API documentation (Swagger):
    * `http://localhost:3000/api` (or the configured port)
