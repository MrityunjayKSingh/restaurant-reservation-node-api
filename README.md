# 🍽️ Restaurant Reservation System (Microservices)

## 🚀 Overview

This project is a **production-style microservices-based Restaurant Table Reservation System** built using Node.js, Express, MongoDB, Redis, and Docker.

It allows:

* Restaurant staff to manage tables
* Customers to book and manage reservations
* Smart table assignment based on guest count
* Secure access using JWT authentication

---

## 🧠 Architecture

### 🔧 Microservices

* **API Gateway (Port 3000)**

  * Central entry point
  * Handles authentication, routing, rate limiting

* **Auth Service (Port 3003)**

  * JWT authentication (access + refresh tokens)
  * User management

* **Table Service (Port 3001)**

  * Manage restaurant tables

* **Reservation Service (Port 3002)**

  * Book, view, cancel reservations
  * Smart table assignment
  * Redis-based locking (prevents double booking)

* **MongoDB**

  * Database (separate collections per service)

* **Redis**

  * Distributed locking for concurrency control

---

## 🏗️ Architecture Diagram (Logical Flow)

```
Client
   ↓
API Gateway (JWT + Routing)
   ↓
-----------------------------------
| Auth | Table | Reservation Service |
-----------------------------------
   ↓
MongoDB + Redis
```

---

## ⚙️ Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* Redis (ioredis)
* Docker + Docker Compose
* JWT Authentication
* Axios (service communication)

---

## 📦 Installation & Setup

### ✅ Prerequisites

* Node.js (v18+)
* Docker Desktop
* Git

---

### 🔽 Clone Project

```bash
git clone <your-repo-url>
cd restaurant-reservation-microservices
```

---

### 🐳 Run with Docker (Recommended)

```bash
docker-compose up --build
```

---

### 🌐 Services Running On

| Service             | URL                   |
| ------------------- | --------------------- |
| API Gateway         | http://localhost:3000 |
| Auth Service        | http://localhost:3003 |
| Table Service       | http://localhost:3001 |
| Reservation Service | http://localhost:3002 |

---

## 🔐 Authentication Flow

### 1. Login

```http
POST /auth/login
```

**Body**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### 2. Use Token

```http
Authorization: Bearer <accessToken>
```

---

### 3. Refresh Token

```http
POST /auth/refresh
```

---

## 📡 API Endpoints

---

### 🪑 Table Service

#### ➤ Create Table

```http
POST /tables
```

**Body**

```json
{
  "tableNumber": 1,
  "capacity": 4,
  "location": "indoor"
}
```

---

#### ➤ Get All Tables

```http
GET /tables
```

---

### 📅 Reservation Service

#### ➤ Book Reservation (Smart Assignment)

```http
POST /reservations
```

**Body**

```json
{
  "guestCount": 3,
  "date": "2026-05-01",
  "timeSlot": "18:00-20:00"
}
```

---

#### ➤ Get Reservation

```http
GET /reservations/:id
```

---

#### ➤ Cancel Reservation

```http
DELETE /reservations/:id
```

---

## 🧠 Business Logic

### ✅ Smart Table Assignment

* Finds smallest available table for given guest count
* Optimizes seating utilization

---

### ❌ Double Booking Prevention

* Redis distributed locking
* Prevents concurrent booking conflicts

---

### ⏱ Time Slots

* Fixed reservation slots (e.g., 18:00–20:00)

---

## 🧪 Testing

You can test APIs using:

* Postman
* cURL
* REST Client (VS Code)

---

## ⚠️ Common Issues

### ❌ Service not reachable

```bash
docker-compose down -v
docker-compose up --build
```

---

### ❌ Missing data error

Ensure request body includes required fields (e.g., capacity)

---

## 🧠 Interview Highlights

* Microservices architecture
* API Gateway pattern
* JWT authentication with refresh tokens
* Redis for distributed locking
* Dockerized deployment
* Smart algorithm for table allocation

---

## 🚀 Future Improvements

* Kafka (event-driven architecture)
* Role-based access control (RBAC)
* API rate limiting with Redis
* OpenTelemetry tracing
* Kubernetes deployment

---

## 👨‍💻 Author

Mrityunjay Singh

---

## 📌 License

This project is for learning and demonstration purposes.
