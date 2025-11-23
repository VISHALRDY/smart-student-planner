# Smart Student Planner

A simple full-stack study planner for students to track assignments, due dates, and priorities — built with **Node.js**, **Express**, **MongoDB Atlas**, and a clean **HTML/CSS/JavaScript** frontend.

- **Frontend (live):** https://smart-student-planner.netlify.app  
- **Backend API (live):** https://smart-student-planner.onrender.com/api/tasks  

---

## ✨ Features

- ➕ **Add tasks** with:
  - Subject (e.g. *OS, DS, AI*)
  - Task title (e.g. *Assignment 1, Lab 3*)
  - Due date
  - Priority: `LOW`, `MEDIUM`, `HIGH`
- ✅ **Mark tasks as completed**
- 🗑️ **Delete tasks**
- 🔍 **Filter by:**
  - `All`
  - `Pending`
  - `Completed`
  - `High Priority`
- 💾 **Persistent storage** with MongoDB Atlas (cloud database)
- 🌐 **Deployed frontend & backend**
  - Frontend: Netlify
  - Backend: Render

---

## 🧱 Tech Stack

**Frontend**

- HTML5, CSS3, Vanilla JavaScript
- Fetch API to call backend REST APIs

**Backend**

- Node.js
- Express.js
- CORS
- Mongoose (MongoDB ODM)

**Database**

- MongoDB Atlas (hosted in the cloud)

**Deployment**

- Backend: Render (Node web service)
- Frontend: Netlify (static site)

---

## 📁 Project Structure

```bash
smart-student-planner/
├── server.js              # Express server, routes, MongoDB connection
├── package.json           # Node dependencies & scripts
├── frontend/
│   ├── index.html         # Main UI
│   ├── style.css          # Styling
│   └── main.js            # Frontend logic, API calls, filters
└── README.md
