# 🐾 Pet Adoption Management System (Full Stack)

A full-stack **Pet Adoption Management System** where users can browse pets, apply for adoption, and admins manage pets and applications.

Built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MySQL (Sequelize)** on the backend.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- JWT Decode

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Role-based Authorization

---

## 👥 User Roles

- **Visitor**: Browse pets, view pet details
- **User**: Register/login, apply for adoption, view application status
- **Admin**: Manage pets (CRUD), approve/reject adoption applications

---

## 📂 Project Structure

```
pet-adoption/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── configs/
│   ├── scripts/
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── context/
│   │   └── api/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pet_adoption
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd pet-adoption
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Seed Sample Data
```bash
node scripts/seedPets.js
```

### 4️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based route protection
- Frontend guards:
  - PublicRoute (blocks login/register when logged in)
  - AdminRoute (admin-only access)

---

## 🐶 API Overview

### Auth
| Method | Endpoint | Access |
|------|---------|--------|
| POST | /auth/register | Public |
| POST | /auth/login | Public |

### Pets
| Method | Endpoint | Access |
|------|---------|--------|
| GET | /pets | Public |
| GET | /pets/:id | Public |
| POST | /pets | Admin |
| PUT | /pets/:id | Admin |
| DELETE | /pets/:id | Admin |

### Adoptions
| Method | Endpoint | Access |
|------|---------|--------|
| POST | /adoptions | User |
| GET | /adoptions/my | User |
| GET | /adoptions | Admin |
| PUT | /adoptions/:id | Admin |

---

## 🌟 Features

- Pet listing with search, filter & pagination
- Adoption workflow with status tracking
- Admin dashboard for pets & applications
- Secure role-based access control
- Responsive UI

---

## 🧪 Bonus Features

- Sample data seeding
- Clean project structure
- Interview & assignment ready

---

## 📌 Author

**Prateek**  
Full Stack MERN Developer
