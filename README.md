# 🔐 VaultShare – Secure File Management & Sharing API

VaultShare is a backend-only API that allows users to securely upload, manage, and share files via expiring, token-based links.  
Built with Node.js, Express, MongoDB, JWT, and Cloudinary for cloud file storage.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Register/Login/Logout)
- ☁️ Cloud File Upload via Cloudinary
- 📂 File Listing, Downloading, and Deletion
- 🔗 Expiring, Token-Based Shareable Links
- 📈 Audit Logging for File Access
- 🛡️ Rate Limiting for Abuse Prevention

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT, bcrypt
- **Cloud Storage**: Cloudinary
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer
- **Audit Logs**: Custom logging system

---

## 📁 Folder Structure

```
VaultShare/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── config/
├── index.js
├── .env
└── README.md
```

## 📦 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/gaurangagar/VaultShare.git
cd VaultShare
```
### 2. Install Dependencies
```
npm install
```
### 3. Setup Environment Variables
Create a .env file in the root directory and add:

<pre lang="env">MONGO_URL=mongodb://localhost:27017/vaultshare JWT_SECRET=your_jwt_secret PORT=5000 CLOUDINARY_NAME=your_cloudinary_name CLOUDINARY_API_KEY=your_cloudinary_api_key CLOUDINARY_API_SECRET=your_cloudinary_api_secret </pre>
### 4. Start the Server
```
npm run dev
```

## 📌 Base Routes

| Base Route | Description                    |
|------------|--------------------------------|
| `/auth`    | Authentication routes          |
| `/file`    | File management routes         |
| `/share`   | File sharing routes            |
| `/audit`   | File access/audit logs         |

---

## 🔐 Auth Routes

| Method | Endpoint         | Description     |
|--------|------------------|-----------------|
| POST   | `/auth/register` | Register a user |
| POST   | `/auth/login`    | Login user      |
| POST   | `/auth/logout`   | Logout user     |

---

## 📂 File Routes (Protected via Cookie-based JWT)

| Method | Endpoint             | Description                                      |
|--------|----------------------|--------------------------------------------------|
| POST   | `/file/upload`       | Upload a file (`multipart/form-data` with `file`) |
| GET    | `/file/allfiles`     | Get all uploaded files by user                  |
| GET    | `/file/download/:id` | Download a file by ID                           |
| DELETE | `/file/:id`          | Delete a file by ID                             |
| POST   | `/file/share/:id`    | Generate share token for file                   |

---

## 🔗 Share Routes (Protected via Cookie-based JWT)

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/share/:token`   | Access a file via share token  |
| DELETE | `/share/:token`  | Revoke a share token           |

---

## 📈 Audit Routes (Protected via Cookie-based JWT)

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/audit/:userid`   | Get access logs by user ID     |
| GET    | `/audit/:fileid`   | Get access logs by file ID     |

---

## 🔒 Middleware & Security

- **JWT Token Middleware** – protects `/file`, `/share`, and `/audit` routes via HTTP-only cookies
- **Rate Limiting** – applied to sensitive routes to prevent abuse
- **File Ownership Checks** – users can only access/delete their own files
- **Expiring Share Links** – tokens with expiration for secure sharing

---

## 🧪 Testing the API

- Use **Postman** or **Thunder Client** (VS Code)
- First, login via `/auth/login` to receive a signed token cookie
- All protected routes (`/file`, `/share`, `/audit`) will automatically authenticate using the cookie
- For file uploads:
  - Use `multipart/form-data`
  - Add a field named `file` containing the file

> 🛡️ **Note:** No `Authorization` header is needed. Auth is handled via HTTP-only cookies.


#### 🙋‍♂️ Author
Made with ❤️ by @gaurangagar
