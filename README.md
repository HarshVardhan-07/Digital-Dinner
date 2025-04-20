# 🍽️ Digital Diner — Backend

Welcome to the **backend** of **Digital Diner**, a full-stack food ordering application. This server handles user authentication, menu management, and order processing using a **hybrid database architecture** combining **MongoDB** and **PostgreSQL** for optimal performance, flexibility, and scalability.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose** (Users & Menu)
- **PostgreSQL** + **Sequelize** (Orders)
- **JWT Authentication**
- **ES Modules** (`"type": "module"` in `package.json`)

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js**
- **MongoDB** (Local or Cloud instance)
- **PostgreSQL** (Local or Cloud instance)
- **Postman** or **Insomnia** (Optional, for API testing)

### 1. Clone the Repository

```bash
git clone https://github.com/HarshVardhan-07/Digital-Dinner.git
cd Digital-Dinner

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install

### 2.  Set Up Backend
### MongoDB Setup (for Users & Menu)

MongoDB is used to store data for users and menu items in this application. You have two options for setting up MongoDB:

#### Option 1: Local MongoDB Setup
1. **Install MongoDB**: If you don't have MongoDB installed locally, download and install it from [MongoDB's official website](https://www.mongodb.com/try/download/community).
   
2. **Start MongoDB Locally**: Open your terminal and run the following command to start the MongoDB server locally:
   ```bash
   mongod
```

# PostgreSQL Setup for Digital Diner

PostgreSQL is used for storing orders in this application. Follow the steps below to set up PostgreSQL.

## Option 1: Local PostgreSQL Setup

### 1. Install PostgreSQL
If you don't have PostgreSQL installed locally, download and install it from the official [PostgreSQL website](https://www.postgresql.org/download/).

### 2. Start PostgreSQL Locally
After installation, ensure that the PostgreSQL server is running. You can start it using the following command depending on your operating system:

#### On Linux:
```bash
sudo service postgresql start
```
### 3. Access PostgreSQL
Once PostgreSQL is running, you can access the database by logging into the PostgreSQL interactive terminal:
```bash
psql -U postgres
```
### 4. Create a Database
In the PostgreSQL terminal, create a new database for the application:
```sql
CREATE DATABASE digital_diner;
```
### 5. Update `.env` File
Add your PostgreSQL database URI to the `.env` file:
```env
POSTGRES_URI=postgres://<username>:<password>@localhost:5432/digital_diner
```
## MongoDB vs PostgreSQL Design Choices

**MongoDB** and **PostgreSQL** are both powerful databases, but they have distinct use cases.

### MongoDB
- **NoSQL** database, stores data in a flexible, document-based format (JSON-like).
- Ideal for handling unstructured or semi-structured data.
- Supports high flexibility and rapid development, particularly when your data model is subject to frequent changes.
- Scales horizontally with ease, making it ideal for applications with large-scale, distributed, or growing data.
- **Use Case in Digital Diner**: MongoDB is typically better for unstructured data, like user profiles or logs.

### PostgreSQL
- **Relational database** with structured data in tables, suitable for complex queries and relationships.
- Strong ACID compliance and data integrity support.
- Ideal for applications that require complex transactions or data with a well-defined schema.
- Supports vertical scaling and is typically used when you have structured data or need strong consistency guarantees.
- **Use Case in Digital Diner**: PostgreSQL is used here for storing orders because it provides strong consistency and supports complex relationships between entities (e.g., orders, users, and products).


## API Endpoints

### Authentication & User Management:
- **POST /api/auth/register** — Register a new user
    - **Request Body**:
        ```json
        {
            "name": "John Doe",
            "phone": "1234567890",
            "password": "yourpassword"
        }
        ```
    - **Response**:
        ```json
        {
            "token": "your-jwt-token",
            "name": "John Doe",
            "phone": "1234567890"
        }
        ```

- **POST /api/auth/login** — Login a user (returns JWT token)
    - **Request Body**:
        ```json
        {
            "phone": "1234567890",
            "password": "yourpassword"
        }
        ```
    - **Response**:
        ```json
        {
            "token": "your-jwt-token",
            "name": "John Doe",
            "phone": "1234567890"
        }
        ```

### Menu Management (MongoDB):
- **GET /api/menu** — Get all menu items (with optional category filter)
    - **Query Params** (optional): `category`
    - **Response**:
        ```json
        [
            {
                "id": "item_id",
                "name": "Menu Item 1",
                "description": "Description of menu item",
                "price": 10.99,
                "category": "category_name"
            },
            {
                "id": "item_id_2",
                "name": "Menu Item 2",
                "description": "Description of menu item",
                "price": 12.99,
                "category": "category_name"
            }
        ]
        ```

- **GET /api/menu/:id** — Get a single menu item by ID
    - **Response**:
        ```json
        {
            "id": "item_id",
            "name": "Menu Item 1",
            "description": "Description of menu item",
            "price": 10.99,
            "category": "category_name"
        }
        ```

- **POST /api/menu** — Add a new menu item (requires admin authentication)
    - **Request Body**:
        ```json
        {
            "name": "New Menu Item",
            "category": "category_name",
            "description": "Description of new menu item",
            "price": 14.99,
            "imageUrl": "image_url",
            "available": true
        }
        ```
    - **Response**:
        ```json
        {
            "message": "Menu item added successfully",
            "menuItem": {
                "id": "new_item_id",
                "name": "New Menu Item",
                "category": "category_name",
                "description": "Description of new menu item",
                "price": 14.99,
                "imageUrl": "image_url",
                "available": true
            }
        }
        ```

- **PUT /api/menu/:id** — Update an existing menu item by ID (requires admin authentication)
    - **Request Body**:
        ```json
        {
            "name": "Updated Menu Item",
            "category": "category_name",
            "description": "Updated description of menu item",
            "price": 11.99,
            "imageUrl": "updated_image_url",
            "available": true
        }
        ```
    - **Response**:
        ```json
        {
            "message": "Menu item updated successfully",
            "menuItem": {
                "id": "item_id",
                "name": "Updated Menu Item",
                "category": "category_name",
                "description": "Updated description of menu item",
                "price": 11.99,
                "imageUrl": "updated_image_url",
                "available": true
            }
        }
        ```

### Order Management (PostgreSQL):
- **POST /api/order** — Create a new order (JWT Protected)
    - **Request Body**:
        ```json
        {
            "items": [
                {
                    "menuItemId": "item_id",
                    "quantity": 2
                },
                {
                    "menuItemId": "item_id_2",
                    "quantity": 1
                }
            ],
            "totalPrice": 35.97
        }
        ```
    - **Response**:
        ```json
        {
            "message": "Order created successfully",
            "order": {
                "orderId": "order_id",
                "status": "pending",
                "items": [
                    {
                        "menuItemId": "item_id",
                        "quantity": 2
                    },
                    {
                        "menuItemId": "item_id_2",
                        "quantity": 1
                    }
                ],
                "totalPrice": 35.97
            }
        }
        ```

- **GET /api/orders/:phone** — Get orders by phone number (JWT Protected)
    - **Response**:
        ```json
        [
            {
                "orderId": "order_id",
                "phone": "1234567890",
                "status": "completed",
                "items": [
                    {
                        "menuItemId": "item_id",
                        "quantity": 2
                    }
                ],
                "totalPrice": 22.98,
                "orderDate": "2025-04-19T14:30:00Z"
            },
            {
                "orderId": "order_id_2",
                "phone": "1234567890",
                "status": "pending",
                "items": [
                    {
                        "menuItemId": "item_id_2",
                        "quantity": 1
                    }
                ],
                "totalPrice": 12.99,
                "orderDate": "2025-04-20T10:00:00Z"
            }
        ]
        ```
## JWT Authentication with .env Setup

### Overview
JWT (JSON Web Tokens) is used for secure authentication in the app. The token is signed with a secret key and is passed in the request header as `Authorization` for protected routes.

For enhanced security, sensitive information, such as the JWT secret key, should be stored in environment variables using a `.env` file.

### Setting Up `.env` for JWT
1. **Create a `.env` File:**
   In the root of your project, create a file named `.env` if you don't already have one.

2. **Add the JWT Secret to `.env`:**
   Add the following line to your `.env` file to store your JWT secret key:


Replace `your-secret-key` with a strong secret string (e.g., a random alphanumeric string). This key is used to sign and verify JWT tokens.

3. **Install `dotenv` Package:**
In your project, install the `dotenv` package to load environment variables from the `.env` file.
```bash
npm install dotenv


## 🌐 Live Demo

Check out the live project deployed on Netlify:  
👉 [Digital Diner - Live App](https://comfy-alpaca-aa7d20.netlify.app/)

> ⚠️ This frontend will work **only after** setting up:
> - The backend server locally (`http://localhost:5000`)
> - MongoDB (for user authentication, menu items, etc.)
> - PostgreSQL (for order management and relational data)
