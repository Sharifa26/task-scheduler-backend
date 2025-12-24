# Task Backend

Simple backend for managing tasks — includes installation and run instructions.

## Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)

## Install

1. Clone the repository and change into the project folder:

```bash
git clone https://github.com/Sharifa26/task-scheduler-backend.git
cd task-backend
```

2. Install dependencies:

```bash
npm install
```

## Run

- Start the app (if `start` is defined in `package.json`):

```bash
npm start
```

- Or run directly with Node:

```bash
node index.js
```

## Project Structure

- `index.js` — application entry point
- `controllers/taskController.js` — request handlers
- `routes/taskRoute.js` — route definitions
- `utils/generateId.js` — helper to create IDs
- `utils/taskFile.js` — file persistence utilities

## Notes

- This README is minimal. Add details about environment variables or API endpoints as the project grows.

## Environment Variables

```bash
FRONT_URL=http://localhost:3000
```

---
