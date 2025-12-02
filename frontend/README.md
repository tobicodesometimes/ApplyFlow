# ApplyFlow

ApplyFlow is a lightweight job search command center built with the MERN stack.  
It helps you track applications, follow-ups, and outcomes in one simple dashboard so your job hunt feels organized instead of chaotic.

## Features

- 🔐 **Authentication & Authorization**
  - User registration and login with JWT-based auth.
  - Protected API routes scoped to the logged-in user (your data stays yours).

- 📥 **Job Application Tracking**
  - Add new applications with:
    - Company
    - Role / position
    - Job link
    - Status (applied, phone, OA, onsite, offer, rejected)
    - Next action (e.g., "Call recruiter", "Send thank-you email")
    - Next action date
    - Notes

- 📊 **Dashboard Overview**
  - Sorted list of applications (by next action date, then applied date).
  - **Today & Overdue Actions** section so you always know who to follow up with.
  - Status shown as colored pills for quick scanning.

- 📈 **Stats Bar**
  - Top-of-dashboard summary cards:
    - Total applications
    - In process
    - Offers
    - Rejections

- ✏️ **Edit Existing Applications**
  - Inline `Edit` button on each row.
  - Pre-filled form for updating status, next steps, dates, and notes.
  - Dashboard auto-refreshes after changes.

---

## Tech Stack

**Frontend**

- React (via Vite)
- React Router DOM
- Axios

**Backend**

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv, cors, morgan

---

## Project Structure

```txt
ApplyFlow/
  backend/
    src/
      config/         # MongoDB connection
      controllers/    # auth & application controllers
      middleware/     # auth middleware, error handlers
      models/         # Mongoose models (User, Application)
      routes/         # auth & application routes
      utils/          # token helpers, etc.
      server.js       # Express app entry
    .env              # backend environment variables (ignored by git)
    package.json

  frontend/
    src/
      api/            # axios client + API helpers
      components/
        layout/       # Navbar, ProtectedRoute
        applications/ # table, rows, forms, stats, today panel
      context/        # auth context + hook
      pages/          # Login, Register, Dashboard, NotFound
      styles/         # globals.css
      main.jsx
      App.jsx
    .env              # frontend environment variables (ignored by git)
    package.json

Getting Started
Prerequisites

Node.js (LTS recommended)

npm or yarn

A MongoDB instance (local or Atlas)

1. Clone the repository

git clone <YOUR_REPO_URL> ApplyFlow
cd ApplyFlow

2. Backend setup
cd backend
npm install

Create a .env file in the backend folder:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
JWT_SECRET= whatever_you_want_this_to_be
NODE_ENV=development
PORT=5000

Run the backend:

npm run dev

3. Frontend setup

Open a new terminal window/tab in the project root:

cd frontend
npm install

Create a .env file in the frontend folder:

VITE_API_URL=http://localhost:5000/api

Run the frontend:

npm run dev

4. Using the app

Visit the frontend in your browser (e.g., http://localhost:5173).

Register a new account on the Register page.

Log in with that account.

On the Dashboard:

Use Add Application to create your first entry.

See it appear in:

The main table (sorted by upcoming actions).

The Today & Overdue Actions section if the next action date is today or earlier.

Watch the stats bar update as you add / update applications.

Use the Edit button in the table to update status, next steps, dates, and notes.

API Overview (High Level)

All API routes are prefixed with /api.

Auth

POST /api/auth/register – create user, returns user + JWT.

POST /api/auth/login – login, returns user + JWT.

Applications (JWT required via Authorization: Bearer <token>)

GET /api/applications – list applications for the logged-in user.

Optional query params: status, search

POST /api/applications – create a new application.

PUT /api/applications/:id – update an existing application.

(You can extend with DELETE /api/applications/:id later.)

Future Improvements / Ideas

Some ideas for next iterations:

Delete applications (with a confirmation step).

Duplicate an existing application to speed up tracking similar roles.

Export data as CSV for spreadsheet lovers.

Tagging or categorization (e.g., “dream companies”, “referral”, “cold apply”).

Simple reminders / notifications for overdue follow-ups.

Why I Built This

ApplyFlow came out of my own job search:
keeping everything in random docs, spreadsheets, and tabs was messy and stressful.

This project lets me:

Practice the full MERN stack end-to-end.

Ship something I would actually use during my job hunt.

Showcase real-world skills: auth, protected routes, CRUD, filtering, and a clean, focused UI.



