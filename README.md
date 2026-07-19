# FinanceIQ — Smart Budget Planner

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-red)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)

> A full-stack MERN budget planner with React Query, Zustand, and interactive analytics dashboards — a level above a standard CRUD app.

---

## 🚀 Features

- **Smart Dashboard** — Monthly income, expenses, and savings summary with animated Recharts pie and bar charts
- **Transaction Tracker** — Add, view, and delete transactions linked to custom categories
- **Category Management** — Create expense/income categories with custom icons, colors, and monthly budget limits
- **Budget Tracking** — Per-category monthly progress bars with color-coded warnings (near limit / over budget)
- **JWT Authentication** — Secure register/login with bcrypt password hashing and protected routes
- **React Query** — Server state management with automatic caching and cache invalidation
- **Zustand** — Lightweight client state management replacing Redux boilerplate

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| TanStack Query (React Query) | Server state, caching, and data synchronization |
| Zustand | Client state management (auth store) |
| Recharts | Interactive pie and bar chart dashboards |
| React Router v6 | Client-side routing with protected routes |
| Axios | HTTP client with JWT interceptor |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT + bcryptjs | Authentication and password hashing |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
financeiq-smart-budget-planner/
├── backend/
│   └── src/
│       ├── config/         # MongoDB connection
│       ├── controllers/    # Auth, Category, Transaction logic
│       ├── middleware/      # JWT auth middleware
│       ├── models/         # User, Category, Transaction schemas
│       ├── routes/         # API routes
│       ├── utils/          # Token generation
│       └── server.js
├── frontend/
│   └── src/
│       ├── api/            # Axios instance
│       ├── components/     # Sidebar, Layout, Charts, Cards
│       ├── hooks/          # React Query hooks
│       ├── pages/          # Dashboard, Transactions, Categories, Budgets
│       ├── store/          # Zustand auth store
│       └── main.jsx
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all user categories |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Transactions
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions (with filters) |
| POST | `/api/transactions` | Create a transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

---

## 🔑 Key Technical Decisions

- **TanStack Query over useEffect** — eliminates manual loading/error state, gives automatic background refetching and cache invalidation
- **Zustand over Redux** — same global state power with a fraction of the boilerplate
- **Tailwind CSS v4** — migrated from v3 config-based setup to v4's `@theme` CSS token system
- **JWT in Authorization header** — injected via Axios interceptor so every protected request is automatically authenticated

---

## 👨‍💻 Author

**Faizan Tanwar**
- GitHub: [@faizantanwar16](https://github.com/faizantanwar16)
- LinkedIn: [linkedin.com/in/faizan-tanwar](https://linkedin.com/in/faizan-tanwar)

---

## 📄 License

This project is licensed under the MIT License.
