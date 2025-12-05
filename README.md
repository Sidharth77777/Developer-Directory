# Developer Directory App

A full-stack web application built as part of the **Full Stack Internship Task Assessment for Talrn.com**.  
This project enables adding, viewing, searching, and filtering developers with a clean UI and a fully deployed backend.

---

##  Live Demo

Frontend: https://developer-directory-five.vercel.app/  
Backend API: https://developer-directory-pnu6.onrender.com

---

## 📌 Features

### 🖥️ Frontend (React + TailwindCSS)
- ✔ Add Developer Form with validation
- ✔ Fields:
  - Name
  - Role (Frontend / Backend / Full-Stack)
  - Tech Stack (comma-separated)
  - Experience (years)
- ✔ Developer listing in responsive UI
- ✔ Search & Filter capabilities
- ✔ Toast messages for success/error
- ✔ Modern design & mobile-friendly layout

---

### ⚙️ Backend (Node.js + Express + MongoDB)

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | `/api/developers`   | Add a new developer                |
| GET    | `/api/developers`   | Get all developers with pagination |
| GET    | `/api/developers/q` | Search/filter developers           |


| Param       | Example           | Description                           |
| ----------- | ----------------- | ------------------------------------- |
| `role`      | `role=Frontend`   | Filter by role                        |
| `techStack` | `techStack=React` | Filter by tech stack keyword          |
| `page`      | `page=1`          | Page number for pagination (optional) |
| `limit`     | `limit=10`        | Results limit per page (optional)     |


- ✔ Deployed on Render
- ✔ CORS configured for frontend access
- ✔ Environment variables for secure deployment

---

## 🛠 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React, TypeScript, TailwindCSS, Material UI |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Render (Backend) |
| Version Control | Git + GitHub |

---

## ✨ Conclusion

This project successfully meets all internship task requirements from Talrn.com:

✔ Full Stack | ✔ Hosted | ✔ Filters | ✔ Pagination | ✔ Responsive UI

✔ Toast Notifications | ✔ MongoDB | ✔ Clean Code | ✔ Proper README

---

## 📬 Contact & Availability

Name: Sidharth KS

Email: sidharthks2004@gmail.com , cryptosidweb3@gmail.com
