# 🎧 Spotify Clone Backend (Role-Based Auth)

A RESTful backend API built with Node.js and Express for a Spotify-inspired music streaming platform. It features role-based access control (Users and Artists), cookie-based authentication, database persistence, and cloud storage integration for audio uploads.

## ✨ Features

* **Authentication & Session Management:** User registration, login, and logout powered by HTTP-only cookies.
* **Role-Based Access Control (RBAC):** Dedicated middleware (`authUser` and `authArtist`) restricting upload/creation privileges to artists and streaming/browsing to authenticated users.
* **Music & Album Management:** Artists can upload audio tracks via `multer` (processed through a dedicated storage service) and organize tracks into albums.
* **Modular Architecture:** Clean separation of concerns across controllers, database connection, middlewares, data models, routes, and storage services.

## 🛠️ Tech Stack

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** MongoDB / Mongoose *(assumed from `db/db.js` and `models/`)*
* **File Handling & Cloud Storage:** Multer (Memory Storage) + Custom Storage Service (`storage.service.js`)
* **Middleware:** `cors`, `cookie-parser`, `express.json()`

## 📁 Project Structure

```text
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── album.model.js
│   │   ├── music.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   ├── services/
│   │   └── storage.service.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* npm
* Database instance (e.g., MongoDB Atlas or local MongoDB)
* Cloud storage credentials (e.g., Cloudinary / ImageKit / AWS S3)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd spotify-clone-rbac-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your environment keys:
   ```env
   PORT=5000
   MONGO_URI=your_database_connection_string
   JWT_SECRET=your_jwt_secret_key
   STORAGE_API_KEY=your_storage_api_key
   STORAGE_API_SECRET=your_storage_api_secret
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user or artist account |
| `POST` | `/api/auth/login` | Public | Log in and set authentication cookie |
| `POST` | `/api/auth/logout` | Public | Clear authentication cookie and log out |

### Music & Albums (`/api/music`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/music/create-music` | Artist | Upload a new audio track (`multipart/form-data`, field: `music`) |
| `POST` | `/api/music/create-album` | Artist | Create a new album |
| `GET` | `/api/music/` | User | Fetch all available music tracks |
| `GET` | `/api/music/albums` | User | Fetch all albums |
| `GET` | `/api/music/albums/:albumId` | User | Fetch details and tracks for a specific album |

## 📝 License

This project is licensed under the MIT License.
