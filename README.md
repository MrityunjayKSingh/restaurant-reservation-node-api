# 🍽️ Restaurant Reservation System (Microservices)

---

## 🚀 Overview

This project is a **production-style microservices-based Restaurant Table Reservation System** built using:

* Node.js (Express)
* MongoDB
* Redis
* Docker
* JWT Authentication

It supports:

* Table management
* Reservation booking
* Smart table assignment
* Distributed locking (Redis)
* Secure API Gateway

---

## 🧠 Architecture

### 🔧 Services

| Service             | Port  |
| ------------------- | ----- |
| API Gateway         | 3000  |
| Auth Service        | 3003  |
| Table Service       | 3001  |
| Reservation Service | 3002  |
| MongoDB             | 27017 |
| Redis               | 6379  |

---

### 🔁 Flow

```
Client → API Gateway → Services → MongoDB / Redis
```

---

## ⚙️ Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* Redis (ioredis)
* Docker + Docker Compose
* JWT Authentication
* Joi Validation
* Swagger API Docs

---

## 📦 Local Setup

### ✅ Prerequisites

* Node.js (v18+)
* Docker & Docker Compose
* Git

---

### 🔽 Clone Project

```bash
git clone <your-repo-url>
cd restaurant-reservation-microservices
```

---

### 🐳 Run with Docker

```bash
docker-compose up --build
```

---

### 🌐 Access Services

| Service      | URL                        |
| ------------ | -------------------------- |
| API Gateway  | http://localhost:3000      |
| Swagger Docs | http://localhost:3000/docs |

---

## 🔐 Authentication

### Login

```http
POST /auth/login
```

```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### Use Token

```http
Authorization: Bearer <accessToken>
```

---

## 📡 API Endpoints

---

### 🪑 Tables

#### Create Table

```http
POST /tables
```

```json
{
  "tableNumber": 1,
  "capacity": 4,
  "location": "indoor"
}
```

---

#### Get Tables

```http
GET /tables
```

---

### 📅 Reservations

#### Book Reservation

```http
POST /reservations
```

```json
{
  "guestCount": 3,
  "date": "2026-05-01",
  "timeSlot": "18:00-20:00"
}
```

---

#### Get Reservation

```http
GET /reservations/:id
```

---

#### Cancel Reservation

```http
DELETE /reservations/:id
```

---

## 🧠 Business Logic

### ✅ Smart Table Assignment

* Finds smallest suitable table
* Maximizes utilization

### ❌ Double Booking Prevention

* Redis locking prevents race conditions

---

## 📬 API Testing

Use Postman collection included in project.

---


# ☁️ AWS Deployment Guide (EC2 + Docker)

---

## 🪪 1. Launch EC2 Instance

* OS: Ubuntu 22.04
* Instance: t2.micro
* Storage: 20GB

---

## 🔐 2. Configure Security Group

Allow:

| Port      | Purpose             |
| --------- | ------------------- |
| 22        | SSH                 |
| 3000      | API Gateway         |
| 3001–3003 | Services (optional) |

---

## 🔑 3. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@<EC2-IP>
```

---

## ⚙️ 4. Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

---

## ⚙️ 5. Install Docker Compose

```bash
sudo apt install docker-compose -y
```

---

## 📥 6. Upload Project

### Option A (Recommended)

```bash
git clone <your-repo-url>
cd restaurant-reservation-microservices
```

---

## 🐳 7. Run Application

```bash
docker-compose up --build -d
```

---

## 🌐 8. Access Application

```
http://<EC2-PUBLIC-IP>:3000
```

---

## 🧪 Test Login

```
POST http://<EC2-IP>:3000/auth/login
```

---

## ⚠️ Common Issues

### ❌ Cannot access API

* Check EC2 Security Group
* Check `docker ps`

---

### ❌ Services not connecting

```bash
docker-compose restart
```

---

## 🧠 Highlights

* Microservices architecture
* API Gateway pattern
* JWT authentication (access + refresh tokens)
* Redis distributed locking
* Dockerized deployment
* AWS EC2 hosting

---

## 🚀 Future Improvements

* Kafka (event-driven)
* RBAC (role-based access)
* Rate limiting (Redis)
* OpenTelemetry tracing
* Kubernetes deployment

---

## 👨‍💻 Author

Mrityunjay Singh

---

## 📌 License

For learning and demonstration purposes.
