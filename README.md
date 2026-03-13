
# 🚧 CivicFlow

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-yellow)
![License](https://img.shields.io/badge/License-Educational-blue)

A **web-based complaint reporting system** that allows citizens to report issues such as potholes and damaged roads.
Users can upload photos and share location, while administrators manage complaints through an interactive dashboard.

---
# 📌 Key Features
User → Frontend → Node.js Server → MongoDB
                       ↓
                 Google Maps API
# 📌 Key Features

## 👤 User Features

* User Registration & Login
* Report road issues with:

  * 📷 Photo Upload
  * 📍 Live Location Sharing
* Automatic **Case ID Generation**
* Track complaint details
* View complaint status:

  * 🔴 Pending
  * 🟡 In Progress
  * 🟢 Resolved
* Complaint details page with:

  * Image preview
  * Google Map
  * Street View
* Light/Dark Mode

---

## 🛠 Admin Features

* Admin Dashboard
* Complaint Statistics:

  * Total Complaints
  * Pending Complaints
  * Resolved Complaints
* Complaint Management Table
* View detailed complaint page
* Update complaint status
* Interactive Google Map showing complaints
* Color-coded map markers:

  * 🔴 Pending
  * 🟡 In Progress
  * 🟢 Resolved

---

# 🗺 System Workflow

```
User submits complaint
        │
        ▼
Photo + Location stored
        │
        ▼
Complaint appears in Admin Dashboard
        │
        ▼
Admin reviews complaint
        │
        ▼
Admin updates status
(Pending → In Progress → Resolved)
```

---

# 🧰 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Google Maps API

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### File Upload

* Multer

---

# 📁 Project Structure

```
road-issue-reporting-system
│
├── server
│   ├── config
│   │   └── db.js
│   ├── models
│   │   ├── User.js
│   │   └── Location.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── locationRoutes.js
│   ├── server.js
|   └── uploads
│
├── client
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── complaint-details.html
│   ├── admin.html
│   ├── admin-complaint.html
│   └── script.js
│
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/road-issue-reporting-system.git
cd road-issue-reporting-system
```

---

## 2️⃣ Install Dependencies

```
npm install
```

---

## 3️⃣ Configure MongoDB

Edit database connection in:

```
server/config/db.js
```

Example:

```
mongodb://127.0.0.1:27017/roadIssuesDB
```

---

## 4️⃣ Start Server

```
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/users
```

## Complaints

```
POST /api/location
GET /api/location
PUT /api/location/:id
```

---

# 📷 Screenshots

### User Dashboard

Users can report road issues with location and photo.

### Admin Dashboard

Admin can monitor all complaints and update their status.

### Complaint Details

Displays photo, map, and complaint information.

---

# 🚀 Future Improvements

* AI-based pothole detection
* Email notifications
* Real-time complaint updates
* Complaint search & filtering
* Mobile application version

---
# 📋 Prerequisites (Things You Must Install)

Before running this project, make sure the following software is installed on your system.

---

## 1️⃣ Node.js

This project uses **Node.js** for the backend.

Download and install:

https://nodejs.org/

After installation, verify:

```
node -v
npm -v
```

---

## 2️⃣ MongoDB

MongoDB is used as the **database**.

Download MongoDB Community Server:

https://www.mongodb.com/try/download/community

After installing, start MongoDB service.

Optional (recommended for beginners):

Install **MongoDB Compass** for GUI database management.

https://www.mongodb.com/products/compass

---

## 3️⃣ Git

Git is used to clone the repository.

Download Git:

https://git-scm.com/

Verify installation:

```
git --version
```

---

## 4️⃣ Code Editor

Recommended editors:

* **Visual Studio Code** (recommended)
* WebStorm
* Sublime Text

Download VS Code:

https://code.visualstudio.com/

Recommended extensions:

* ES7+ React/JS Snippets
* Prettier
* MongoDB for VS Code

---

## 5️⃣ Web Browser

Modern browser required for testing:

* Google Chrome (recommended)
* Microsoft Edge
* Firefox

---

## 6️⃣ Google Maps API Key

This project uses **Google Maps API**.

Create a key from:

https://console.cloud.google.com/

Enable:

* Maps JavaScript API
* Geolocation API

Replace the key in:

```
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY
```

---

# 🚀 Quick Setup After Installing

```
git clone https://github.com/yourusername/road-issue-reporting-system.git

cd road-issue-reporting-system

npm install

npm run dev
```

Then open:

```
http://localhost:3000
```

---

# 📦 Additional Packages Used

These packages will be installed automatically with `npm install`.

```
express
mongoose
cors
bcryptjs
multer
nodemon
```

---
# 👨‍💻 Author

**Deepak Kumar Routray**

---

# 📄 License

This project is developed for **educational purposes**.
=======
# CivicFlow
>>>>>>> 8d2037aa082c1c769c38becff21a23071ab8c6b7
