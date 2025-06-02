# VaultShare
a secure file storage and sharing backend with JWT-based user authentication, upload/download features, expiring shareable links, and full audit logging mimicking the backend of Google Drive architecture

# Secure File Management & Sharing API

A backend-only project that mimics the core functionality of Google Drive’s backend.  
Users can upload files, manage them, and share files securely via expiring links with download limits.  
Built with Node.js, Express, MongoDB, JWT, cloudinary and Multer.

---

## 🗓️ Project Roadmap (4 Weeks)

### Week 1: Project Setup + Authentication + File Upload
- Initialize project with Express and MongoDB
- Create user registration and login with JWT authentication
- Setup Multer middleware for file uploads
- Create File model to store file metadata (filename, size, uploader, etc.)
- Implement `POST /auth/register`, `POST /auth/login`, and `POST /files/upload` endpoints

### Week 2: File Management & Access Control
- Implement file listing, downloading, and deletion
- Restrict file access and deletion to the owner only
- Protect routes with JWT middleware
- Implement `GET /files/`, `GET /files/:id/download`, and `DELETE /files/:id`

### Week 3: Sharing System + Expiring Links
- Create share tokens for files with expiry date and download limits
- Implement token-based access to files via share links
- Enable revoking share links
- Implement `POST /files/:id/share`, `GET /share/:token`, and `DELETE /share/:token`

### Week 4: Audit Logs + Polishing + Optional Features
- Log file accesses and downloads with audit entries
- Create endpoint to fetch audit logs (`GET /audit`)
- (Optional) Add email notifications when files are shared
- (Optional) Use AWS S3 or GridFS for file storage
- (Optional) Create Swagger docs or Postman collection
- (Optional) Write tests using Jest and Supertest

---

## 📋 API Endpoint Overview

| Method | Endpoint               | Description                            |
|--------|------------------------|--------------------------------------|
| POST   | /auth/register         | Register a new user                   |
| POST   | /auth/login            | Login user and get JWT token          |
| POST   | /files/upload          | Upload a file                        |
| GET    | /files/                | Get list of user's uploaded files    |
| GET    | /files/:id/download    | Download a specific file              |
| DELETE | /files/:id             | Delete a file                        |
| POST   | /files/:id/share       | Generate a shareable link             |
| GET    | /share/:token          | Access a file via a share link        |
| DELETE | /share/:token          | Revoke a share link                   |
| GET    | /audit                 | Get download and access audit logs   |

---

## 🧰 Tech Stack
- Node.js + Express.js  
- MongoDB + Mongoose  
- Multer (file uploads)
- Cloudinary (for cloud media management)  
- JSON Web Tokens (JWT) + bcrypt (authentication)  
- express-rate-limit (optional for throttling)  
- nodemailer (optional for email notifications)  
- Jest + Supertest (optional for testing)  

---

## 📁 Folder Structure (Recommended)
file-manager-api/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── utils/
├── uploads/ # If storing files locally
├── config/
├── app.js
├── server.js
└── .env
