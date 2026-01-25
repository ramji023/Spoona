#  Spoona - A Recipe App

<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767622595/ddc662de-11fc-432d-9628-17272a8b8cb3.png" alt="Spoona Banner" width="100%">
  
  <p><strong>A full-stack recipe application with community features, meal planning, and subscription system built with modern technologies.</strong></p>

  ![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)
  ![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
  ![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
  
  🔗 **Live Demo:** [https://spoona-web.vercel.app/](https://spoona-web.vercel.app/)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Spoona** is a comprehensive recipe platform that allows users to create, share, and discover recipes within a vibrant community. Built as a monorepo using Turborepo, it features a modern React frontend and a robust Express.js backend with PostgreSQL database.

### Key Highlights

- 📝 **Full CRUD Operations** - Create, Read, Update, Delete recipes
- 👥 **Community Features** - Share and discover recipes from different communities
- 📅 **Meal Planner** - Plan your meals for the month
- 🔔 **Follow System** - Follow other users and get updates on their recipes
- 🔐 **Authentication & Authorization** - Secure user management
- 🚀 **High Performance** - Optimized with React Query and efficient caching

---

## ✨ Features

### Recipe Management
- ✅ Create new recipes with images, ingredients, and instructions
- ✅ Save favorite recipes from the community
- ✅ Upload recipe images to Cloudinary
- ❤️ Like recipes and show appreciation
- 📝 Leave notes and comments on recipes
- 🔍 Advanced search with multiple filters (cuisine, difficulty, ingredients, prep time)
- 🏷️ Filter recipes by categories and tags

### Community
- 👥 Browse recipes from other users
- ❤️ Like and save favorite recipes
- 💬 Engage with the cooking community
- 🌟 Discover trending and popular recipes

### Meal Planning
- 📅 Plan meals for the week
- 🗓️ Organize recipes by day

### User Features
- 🔐 User authentication and authorization
- 👤 Personal profile management
- 📚 Personal recipe collection
- 💳 Subscription management

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Zustand](https://img.shields.io/badge/Zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Database & ORM
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Cloud Services
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 🏗️ Architecture

This project follows a **monorepo architecture** using Turborepo for efficient build caching and task running.

```
spoona/
├── apps/
│   ├── api/                # Express.js backend server
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── web/                # React frontend application
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   ├── store/
│       │   └── App.tsx
│       └── package.json
│
└── packages/
    ├── database/           # Prisma schema and migrations
    │   ├── prisma/
    │   └── package.json
    │
    ├── eslint-config/      # Shared ESLint configuration
    │
    ├── typescript-config/  # Shared TypeScript configuration
    │
    ├── tailwind-config/    # Shared Tailwind CSS configuration
    │
    └── ui/                 # Shared React components
        ├── components/
        └── package.json
```

## 📸 Screenshots

### Home Page
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767622595/ddc662de-11fc-432d-9628-17272a8b8cb3.png" alt="Home Page" width="800">
  <p><em>Discover recipes and explore the community</em></p>
</div>

### Recipe Details
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767622865/Screenshot_2026-01-05_194847_qcl442.png" alt="Recipe Details" width="800">
  <p><em>Detailed recipe view with ingredients and instructions</em></p>
</div>

### Planner Page
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1765245850/5b2eaa0b-f4dc-4693-b6ba-0a8ef4cdc9da.png" alt="Create Recipe" width="800">
  <p><em>Planner Page</em></p>
</div>

### Community Feed
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767622949/0602d782-dcda-43bc-988c-30d18f86af7e.png" alt="Community Feed" width="800">
  <p><em>Browse and discover recipes from the community</em></p>
</div>

### Show Recipes, Categories 
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767622712/28648e92-e687-4458-9660-b5eccd59a931.png" alt="User Profile" width="800">
  <p><em>Manage your recipes and recipe's categories</em></p>
</div>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Docker** (for containerization)
- **PostgreSQL** (or use Docker)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramji023/Spoona.git
   cd Spoona
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `apps/api` and `apps/web`:
   
   **apps/api/.env**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/spoona"
   JWT_SECRET="your-secret-key"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   PORT=3000
   NODE_ENV=development
   ```
   
   **apps/web/.env**
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Set up the database**
   
   Using Docker:
   ```bash
   docker-compose up -d postgres
   ```
   
   Or manually start PostgreSQL, then run migrations:
   ```bash
   pnpm db:migrate
   ```

5. **Start the development servers**
   ```bash
   pnpm dev
   ```
   
   This will start:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

---

## 📁 Project Structure

```
spoona/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── controllers/      # Request handlers
│   │   │   ├── routes/           # API routes
│   │   │   ├── middleware/       # Custom middleware
│   │   │   ├── services/         # Business logic
│   │   │   ├── utils/            # Utility functions
│   │   │   └── index.ts          # Entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── components/       # React components
│       │   ├── pages/            # Page components
│       │   ├── hooks/            # Custom hooks
│       │   ├── store/            # Zustand stores
│       │   ├── lib/              # Utilities
│       │   ├── styles/           # Global styles
│       │   └── App.tsx
│       ├── public/
│       └── package.json
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── migrations/      # Database migrations
│   │   └── src/
│   │       └── index.ts         # Prisma client
│   │
│   ├── ui/                      # Shared UI components
│   ├── eslint-config/           # ESLint configs
│   ├── typescript-config/       # TypeScript configs
│   └── tailwind-config/         # Tailwind configs
│
├── turbo.json                   # Turborepo configuration
├── package.json                 # Root package.json
├── pnpm-workspace.yaml          # PNPM workspace config
├── docker-compose.yml           # Docker services
└── README.md
```

---

## 🔧 Environment Variables

### Backend (apps/api/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `CORS_ORIGIN` | Allowed CORS origins | ❌ |

### Frontend (apps/web/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | ✅ |


## 🐳 Docker

### Using Docker Compose

Start all services:
```bash
docker-compose -f docker-compose-dev up -d
```

Services included:
- PostgreSQL database
- Backend API
- Frontend application
- 

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables
2. Deploy from GitHub
3. Build command: `cd ./apps/api && pnpm prod:build"`

### Frontend Deployment (Vercel)

1. Connect GitHub repository
2. Set build command: `pnpm build --filter web`
3. Set output directory: `apps/web/dist`
4. Add environment variables

### Database (Railway/Supabase)

1. Create PostgreSQL instance
2. Copy connection string to `DATABASE_URL`
3. Run migrations


## 🔮 Future Enhancements
- [ ] Edit and update existing recipes
- [ ] Delete recipes you've created
- [ ] Recipe ratings and reviews
- [ ] Social sharing features
- [ ] Recipe collections/cookbooks
- [ ] Nutritional information calculator
- [ ] Shopping list generation
- [ ] Mobile application (React Native)
- [ ] Recipe video uploads
- [ ] Recipe import from URLs
- [ ] Print-friendly recipe cards

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Ram Ji Mishra** - [@yourhandle](https://x.com/ramjimishra001) - mramji747@gmail.com

---

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) - Build system
- [Prisma](https://www.prisma.io/) - Database ORM
- [React Query](https://tanstack.com/query/) - Server state management
- [Zustand](https://zustand-demo.pmnd.rs/) - Client state management
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Vercel](https://vercel.com/) - Deployment platform

---

## ⭐ Show your support

Give a ⭐️ if you like this project!
