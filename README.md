# Task Tracker

A simple, responsive task management application built with the MERN stack (MongoDB, Express, React, Node.js).

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/shreyashsrivastava24/taskflow)

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

The project is pre-configured with a Render Blueprint (`render.yaml`) to run the backend and serve the compiled frontend from a single web service.

### 1. Database (MongoDB Atlas)
1. Register/Login at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Cluster (Shared) on your preferred cloud provider (e.g. AWS).
3. Under **Database Access**, create a user with read/write privileges.
4. Under **Network Access**, whitelist `0.0.0.0/0` to allow incoming traffic from hosting servers.
5. Fetch the Connection String (choose "Node.js driver") and copy it.

### 2. One-Click Deploy to Render
1. Ensure your latest changes are pushed to your GitHub repository.
2. Click the **Deploy to Render** button below or at the top of the README.
3. Render will prompt you for the `MONGODB_URI`. Paste the MongoDB connection string you copied in step 1.
4. Click **Apply**. Render will automatically provision, build, and deploy the application.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/shreyashsrivastava24/taskflow)

### Alternative Manual Blueprint Setup (Render Dashboard)
1. Go to the [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Blueprint**.
3. Connect this GitHub repository.
4. Specify a group name and click **Next**.
5. Input the `MONGODB_URI` environment variable when prompted.
6. Click **Apply**.
