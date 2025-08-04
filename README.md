# Layer Visibility App (React + GraphQL)

This is a simple full-stack CAD-style layer visibility toggle panel built with:

- **Frontend**: React + TypeScript + Tailwind CSS + Apollo Client
- **Backend**: Apollo Server (GraphQL) with in-memory data

---

## 📁 Project Structure

layer-visibility-app/
├── client/ # React frontend
├── server/ # GraphQL backend


---

## 🚀 Features

### Frontend (Client)
- Built with Vite + React + TypeScript
- Styled using Tailwind CSS
- Uses Apollo Client to fetch layer data from GraphQL server
- Allows toggling individual layer visibility
- Supports bulk toggle: "Hide All" / "Show All"
- Responsive and accessible UI

### Backend (Server)
- Built with Apollo Server using GraphQL SDL
- Layer model includes: `id`, `name`, `visible`, `color`, and `lastModified`
- In-memory storage (no database required)
- Supports querying layers, filtering by visibility and name
- Mutation: Toggle layer visibility by ID
- Scalar support: `DateTime` using `graphql-scalars`

---

## 🛠 Setup & Run

### 1. Start the Server

```bash
cd server
npm install
npx ts-node src/index.ts

### 2. Start the Client

cd client
npm install
npm run dev
