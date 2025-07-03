# 🔗 URL Shortener App (MERN + Supabase)

A full-stack URL Shortener web application that allows users to register, log in, shorten long URLs with custom short codes, and track click counts — powered by **React, Supabase, and Express**.

---

## 🚀 Live Demo

🌐 **Frontend:** [https://url-shortener-navy-kappa.vercel.app](https://url-shortener-navy-kappa.vercel.app)  
🔁 **Redirect Backend:** [https://thmd-url.up.railway.app](https://thmd-url.up.railway.app)

---

## ✨ Features

- 🔐 User authentication (Sign up / Log in) using Supabase
- 🔗 URL shortening with optional custom short code
- 📄 Dashboard to view, manage and delete links
- 📈 Click tracking per short link
- 🎯 Clean and minimal UI with Tailwind CSS
- 🌍 Short URL redirection backend using Express.js

---

## 🛠️ Tech Stack

| Layer      | Tech                                       |
|------------|--------------------------------------------|
| Frontend   | React, Vite, Tailwind CSS                  |
| Backend    | Express.js (Node)                          |
| Database   | Supabase (PostgreSQL + Auth + RLS)         |
| Hosting    | Vercel (Frontend) + Render (Backend)       |

---

## 🗂️ Folder Structure

```bash
url-shortener-project/
├── frontend/              # React frontend (Vite)
├── backend/              # Express backend (redirect handler)
├── README.md
```

---

## 📦 Setup & Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/thamod-03/url-shortener.git
cd url-shortener
```

---

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside `/client`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_anon_key
```

---

### 3. Setup Backend

```bash
cd server
npm install
node server.js
```

Create a `.env` file inside `/server`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_anon_key
```

---

## 🧠 Supabase Tables

### 🔹 `users` Table
| Column      | Type       |
|-------------|------------|
| id          | UUID (PK)  |
| email       | Text       |
| password    | Text       |
| created_at  | Timestamp  |

### 🔹 `urls` Table
| Column      | Type       |
|-------------|------------|
| id          | UUID (PK)  |
| longUrl    | Text       |
| shortCode  | Text (Unique) |
| clicks      | Integer    |
| user_id     | UUID (FK to users.id) |
| created_at  | Timestamp  |

---

## ✅ Policies Used

- RLS enabled on `urls`
- `SELECT`, `INSERT`, `UPDATE`, `DELETE` policies scoped to authenticated user (`user_id = auth.uid()`)

---

## 💡 Future Improvements

- QR code generation for short links
- Analytics dashboard (location, browser info, etc.)
- Expiry for links
- Public link sharing (Bitly-style)
- Admin panel

---

## 🧑‍💻 Author

**Thamod**  
💻 GitHub: [@thamod-03](https://github.com/thamod-03)

