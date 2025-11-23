# Smart Student Planner 📚

A full-stack **study planner web app** that lets students manage their tasks with priorities, due dates, and completion status — backed by **Node.js + Express + MongoDB Atlas** and a clean **HTML/CSS/JS** frontend.

---

## 🌍 Live Demo

- **Frontend (Netlify)**: https://smart-student-planner.netlify.app  
- **Backend API (Render)**: https://smart-student-planner.onrender.com/api/tasks  

> If the backend is asleep (Render free tier), the first request may take a few seconds to wake up.

---

## ✨ Features

- ➕ Add tasks with:
  - Subject
  - Title
  - Due date
  - Priority (Low / Medium / High)
- ✅ Mark tasks as **Completed**
- 🗑 Delete tasks
- 🔍 Filter by:
  - All
  - Pending
  - Completed
  - High Priority
- ☁ Data stored in **MongoDB Atlas** (Cloud NoSQL)
- 🌐 Fully deployed:
  - Backend on **Render**
  - Frontend on **Netlify**

---

## 🛠 Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6)**  
  - `fetch()` for API calls  
  - DOM manipulation

### Backend
- **Node.js**
- **Express.js**
- **CORS**
- **Mongoose** (MongoDB ODM)

### Database
- **MongoDB Atlas** (Cloud NoSQL)

### Deployment
| Platform | Usage                |
|----------|----------------------|
| Render   | Backend API hosting  |
| Netlify | Frontend static hosting |

---

## 📁 Folder Structure

```bash
smart-student-planner/
├── backend/
│   ├── server.js         # Express server + API routes + MongoDB connection
│   ├── package.json      # Backend dependencies & scripts
│   └── ...               # (any future backend files)
│
├── frontend/
│   ├── index.html        # Main UI
│   ├── main.js           # Frontend logic & API calls
│   └── styles.css        # Styling
│
├── README.md
└── .gitignore
