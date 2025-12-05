# 👨‍💻 Developer Directory App — Full-Stack Internship Task (Round 2)

A fully authenticated and production-ready **Developer Directory** platform built as part of the **Talrn.com Full-Stack Internship Assessment**.

Users can **sign up, login, browse developers, view profiles, edit entries, search, filter, sort, delete records**, and access the system only after authentication. All features comply with Round-2 requirements.

---

## 🚀 Live Project Links

- **Frontend (Vercel)**  
  🔗 https://developer-directory-five.vercel.app/

- **Backend API (Render)**  
  🔗 https://developer-directory-pnu6.onrender.com

---

## ✨ Core Features (Mandated in Task 2)

### 🔐 Authentication
- JWT-based login & signup
- Password hashing (bcrypt)
- Protected routes (only logged-in users can view Developer Directory)
- Logout + token handling

---

### 🧑‍💼 Developer Profiles
Each developer has a dedicated view page:
- Name
- Role (Frontend / Backend / Full-Stack)
- Tech Stack (shown as tags)
- Years of Experience
- About / Description
- Joining date
- Optional photo upload

---

### 🔍 Enhanced Developer Directory
- Search by **Name** or **Tech Stack**
- Filter by **Role**
- Sort by **Experience** (ascending/descending)
- Pagination implemented
- Clean, modern UI using **MUI + TailwindCSS**

---

### 🛠 CRUD Operations (Secure + Validated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check Health of Server |
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/developers` | Create developer (protected) |
| GET | `/api/developers` | Listing + Pagination (protected) |
| GET | `/api/developers/q` | search + filters + pagination (protected) |
| GET | `/api/developers/:id` | Fetch single profile (protected) |
| PUT | `/api/developers/:id` | Edit a developer (protected) |
| DELETE | `/api/developers/:id` | Delete developer (protected) |

🧩 Input validation using **Zod**  
🛡️ Global authentication middleware

---

## 🎨 UI / UX Enhancements
- Toast notifications for success & errors
- Fully responsive layout
- Loading indicators for API calls
- Error handling & fallback UI
- Deployed with proper CORS & ENV configuration

---

## 🧰 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + TypeScript + TailwindCSS + Material UI |
| Backend | Node.js + Express + TypeScript |
| Auth | JWT + bcrypt |
| Database | MongoDB Atlas |
| Storage / Media | Cloudinary |
| Deployment | Vercel (Frontend) + Render (Backend) |
| Version Control | Git + GitHub |

---

## 📝 Architecture Overview

- Decoupled frontend–backend communication via REST API

- Clean folder structure & modular codebase

- MVC-style backend with reusable controller logic

- Secure user-role design

---

## ✨ Accuracy Check vs Requirements

| Requirement                             | Present in README                               | Confirmed Working |
| --------------------------------------- | ----------------------------------------------- | ----------------- |
| Authentication (JWT + Protected Routes) | ✅                                               | ✔️                |
| CRUD with Validation                    | ✅                                               | ✔️                |
| Profile Page                            | ✅                                               | ✔️                |
| Sorting / Filtering                     | ❗*Filtering & search include in q endpoint — ✓* | ✔️                |
| Pagination                              | 🟢 explicitly mentioned                         | ✔️                |
| Deployment (Frontend + Backend)         | 🟢 both URLs provided                           | ✔️                |
| UI/UX Enhancements                      | 🟢 listed                                       | ✔️                |


---

## 📬 Contact & Availability

Name: Sidharth KS

Email: sidharthks2004@gmail.com , cryptosidweb3@gmail.com
