# Event Calendar Application

A modern event calendar application with a React frontend and Express backend API.

## Features

- 📅 Interactive calendar view
- ✨ Add events to specific dates
- 🎨 Color-coded events
- 💾 Persistent event storage via backend API
- 🔄 Real-time event updates
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18
- Vite
- CSS3

### Backend
- Node.js
- Express
- File-based JSON storage

## Project Structure

```
evv/
├── src/                    # Frontend source files
│   ├── App.jsx            # Main app component with API integration
│   ├── components/
│   │   └── Calendar.jsx   # Calendar component
│   └── ...
├── backend/               # Backend API server
│   ├── server.js         # Express server with REST API
│   ├── data/             # Event data storage (auto-generated)
│   └── package.json
├── package.json          # Frontend dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install all dependencies (frontend + backend):

```bash
npm run setup
```

Or install them separately:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run install:backend
```

### Running the Application

#### Option 1: Run both frontend and backend together (Recommended)

```bash
npm run start:all
```

This will start:
- Frontend dev server on `http://localhost:5173`
- Backend API server on `http://localhost:5000`

#### Option 2: Run servers separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run backend:dev
```

### API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `GET /api/events/range?startDate=...&endDate=...` - Get events in date range
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event
- `GET /api/health` - Health check

### Event Data Structure

```json
{
  "id": 1,
  "title": "Team Meeting",
  "date": "2025-11-05T08:00:00.000Z",
  "color": "#4285f4"
}
```

## Available Scripts

### Root Level

- `npm run dev` - Start frontend dev server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run backend` - Start backend server
- `npm run backend:dev` - Start backend with auto-reload
- `npm run start:all` - Start both frontend and backend
- `npm run setup` - Install all dependencies
- `npm run install:backend` - Install backend dependencies

### Backend

```bash
cd backend
npm start      # Start server
npm run dev    # Start with auto-reload
```

## Data Persistence

Events are stored in `backend/data/events.json`. This file is automatically created when the server starts for the first time with some sample events.

## Development

The application uses:
- Hot Module Replacement (HMR) for the frontend
- Node's `--watch` flag for backend auto-reload (Node.js v18.11+)

## Production Build

```bash
# Build frontend
npm run build

# The built files will be in the dist/ directory
# Serve them with your preferred static file server
```

## Troubleshooting

### Backend server not connecting

1. Make sure the backend is running on port 5000
2. Check that CORS is enabled (already configured)
3. Verify the API_URL in `src/App.jsx` matches your backend URL

### Events not loading

1. Check browser console for errors
2. Verify backend server is running: visit `http://localhost:5000/api/health`
3. Check that `backend/data/events.json` exists and is valid JSON

## License

MIT

