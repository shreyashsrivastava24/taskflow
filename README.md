# Task Tracker

A simple, responsive task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (Pending, In Progress, Completed) and priority (Low, Medium, High)
- Search tasks by title or description
- Sort tasks by due date or creation date
- View task statistics on dashboard
- Kanban board view to manage tasks by status
- Responsive dark theme UI
- Real-time validation and error handling

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Axios
- Lucide React icons
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- express-validator

## Project Structure

```
task-tracker/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Validation and error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React Context for state
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service calls
│   │   └── App.jsx      # Main app component
│   └── vite.config.js   # Vite configuration
└── package.json         # Project metadata
```

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB connection string

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install-all
   ```

3. Create `.env` files:
   
   **backend/.env:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **frontend/.env:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running Locally

```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately:
npm run backend-dev      # Terminal 1
npm run frontend         # Terminal 2
```

Frontend will be available at `http://localhost:5173`
Backend API at `http://localhost:5000/api`

## API Endpoints

- `GET /api/tasks` - Get all tasks (with search, filter, sort)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

1. Navigate to the dashboard to see task statistics
2. Click "Add" to create a new task
3. Use the kanban board to manage tasks by status
4. Use filters and search to find specific tasks
5. Edit or delete tasks using the card action buttons

## License

ISC
│   ├── utils/           # API JSON response builders
│   ├── .env             # Backend secret variables
│   ├── server.js        # Node.js application entry point
│   └── package.json     # Node.js backend dependencies
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI widgets (cards, modals)
│   │   ├── context/     # React state container (TaskContext)
│   │   ├── pages/       # Core layout views (Dashboard)
│   │   ├── services/    # Axios service layer (api.js)
│   │   ├── App.jsx      # Global React wrapper and Toast setup
│   │   ├── index.css    # Ambient gradients, custom scrollbar styling
│   │   └── main.jsx     # Vite client compiler entry
│   ├── vercel.json      # Routing rewrites for Vercel deployment
│   └── package.json     # Client React dependencies
│
├── .env.example         # System variables templates
├── package.json         # Workspace concurrently execution controls
└── README.md            # Documentation walkthrough
```

---

## ⚙️ Local Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed locally (v18+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally (if testing locally) OR a MongoDB Atlas database cluster URI.

### 1. Clone the repository
Extract the project folders into your workspace root.

### 2. Configure Environment Variables
Copy and rename the environment template:
- Copy the contents from [.env.example](file:///c:/Users/shrey/OneDrive/Desktop/task%20manager/.env.example)
- Create a `.env` file inside `backend/` and insert your database configurations:
  ```text
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/tasktracker
  NODE_ENV=development
  CLIENT_URL=http://localhost:5173
  ```

### 3. Install All Dependencies
From the workspace root, run the setup script to install dependencies for the root orchestrator, backend, and frontend directories:
```bash
npm run install-all
```

---

## 🏃 Running the Application

To boot up both the backend server and frontend dev compiler concurrently with a single terminal command:
```bash
npm run dev
```

The terminal will launch:
- **Backend API**: Running at [http://localhost:5000](http://localhost:5000)
- **Frontend App**: Running at [http://localhost:5173](http://localhost:5173) (automatically opens in browser)

---

## 📖 API Endpoint Documentation
Detailed REST API endpoint documentation with example requests and JSON payloads can be found in the [api_documentation.md](file:///c:/Users/shrey/OneDrive/Desktop/task%20manager/api_documentation.md) file.

---

## ☁️ Deployment Instructions

### 1. Database (MongoDB Atlas)
1. Register/Login at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Cluster (Shared) on your preferred cloud provider (e.g. AWS).
3. Under **Database Access**, create a user with read/write privileges.
4. Under **Network Access**, whitelist `0.0.0.0/30` to allow incoming traffic from hosting servers (or specify Render hosting subnets).
5. Fetch the Connection String (choose "Node.js driver") and keep it handy for backend deployment.

### 2. Backend (Render)
1. Sign up at [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your Git repository.
4. Set the following build properties:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In the **Environment Variables** settings panel, add:
   - `MONGODB_URI` = `[Your MongoDB Atlas connection URI string]`
   - `PORT` = `10000` (Render handles port mappings dynamically, but defaults to this internally)
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = `[Your deployed Vercel frontend URL]`
6. Click **Deploy Web Service**. Render will assign a public URL (e.g. `https://taskflow-api.onrender.com`).

### 3. Frontend (Vercel)
1. Sign up at [Vercel](https://vercel.com).
2. Import your Git repository.
3. Configure the following project parameters:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://your-backend-render-domain.onrender.com/api`
5. Click **Deploy**. Vercel will build, optimize static files, deploy the application, and return the live application URL.
