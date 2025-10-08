# FluentAI

[![Build Status](https://img.shields.io/github/actions/workflow/status/priyanshupanwar066/fluentai/ci.yml?branch=main)](https://github.com/priyanshupanwar066/fluentai/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**FluentAI** — An AI-powered English speaking practice & feedback tool (Next.js frontend + Node/Express backend + Google Gemini).  
Live demo: **(add your deployed link here)**

---

## 🚀 Project Overview
FluentAI helps learners practice spoken English and receive automated feedback on grammar, fluency, and pronunciation using an AI backend. Built with modern web stack and secure authentication (JWT in HTTP-only cookies).

### Key Features
- Real-time speaking feedback (text + audio)  
- Grammar & fluency suggestions powered by Google Gemini (via secure backend)  
- User authentication (register/login) with JWT in HTTP-only cookies  
- Admin dashboard (manage exercises / training data)  
- Responsive UI (mobile + desktop)

---

## 🧰 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js, Express, JWT authentication, MongoDB (Atlas)  
- **AI:** Google Gemini API (requests proxied via backend)  
- **Deployment:** Vercel (frontend) + Render / Railway / Heroku (backend)  
- **Dev tools:** Git, ESLint, Prettier, Docker

---

## 📁 Repo Structure
Explain structure (same as top-level section) — point to `frontend/` and `backend/`.

---

## ⚙️ Environment Variables
> Create `.env` in backend and `.env.local` in frontend (DO NOT commit). See `.env.example` for names.

**Backend (`backend/.env`)**
