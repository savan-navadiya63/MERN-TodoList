# MERN Todo List

A full-stack todo list app built with MongoDB, Express, React, Node.js, and Tailwind CSS.

## Setup

1. Install dependencies:

   ```bash
   npm run install:all
   npm install
   ```

2. Create `server/.env` from `server/.env.example` and set `MONGO_URI`.

3. Start the app:

   ```bash
   npm run dev
   ```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Deployment

### Render Backend

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:

  ```env
  NODE_ENV=production
  MONGO_URI=your_mongodb_atlas_connection_string
  CLIENT_ORIGIN=https://your-netlify-site.netlify.app
  ```

### Netlify Frontend

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/dist`
- Environment variable:

  ```env
  VITE_API_URL=https://your-render-backend.onrender.com
  ```

## API

- `GET /api/todos` - list todos
- `POST /api/todos` - create todo
- `PATCH /api/todos/:id` - update title or completed state
- `DELETE /api/todos/:id` - delete todo
