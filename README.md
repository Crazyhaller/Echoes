# 🎧 5-Echoes — A Brutalist Social Music Platform

5-Echoes is a **minimal, brutalist-style social platform** where users share their **Top 5 music tracks, favorite artists, and genre**.  
It's built with **React + TypeScript**, **TailwindCSS**, **Firebase**, and **Framer Motion**.

---

## ✨ Features

- 🔐 **Authentication**
  - Google OAuth + Email/Password
  - Firebase Auth persistence
- 👤 **Profile System**
  - Custom username
  - Top 5 tracks & artists input
  - Genre selector (including "Other")
  - Social handles: Spotify, Instagram, Facebook
  - Publish toggle to appear in the feed
- 📄 **Live Preview**
  - Realtime preview of your music card while editing
- 🖼 **Brutalist Design**
  - Bold monochrome UI
  - Animated transitions via Framer Motion
- 🔁 **Routing**
  - Landing → Auth → Profile → Home flow
  - Protected routes for authenticated views

---

## 🚀 Tech Stack

| Layer      | Tech                          |
| ---------- | ----------------------------- |
| Frontend   | React, TypeScript             |
| Styling    | TailwindCSS                   |
| Animations | Framer Motion                 |
| Forms      | React Hook Form + Zod         |
| Backend    | Firebase (Auth + Firestore)   |
| State      | LocalStorage + Firebase state |

---

## 🧑‍💻 Getting Started

```bash
# 1. Clone
git clone https://github.com/crazyhaller/echoes.git && cd echoes

# 2. Install dependencies
npm install

# 3. Setup Firebase
# - Enable Email/Password + Google auth
# - Create Firestore & set basic rules
# - Copy config to `.env`

# 4. Start dev server
npm run dev

---

## 🔐 Environment Variables
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
