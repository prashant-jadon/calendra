import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5006;

// Middleware
app.use(cors());
app.use(express.json());

// Path to events data file
const eventsFilePath = join(__dirname, 'data', 'events.json');

// Ensure data directory and file exist
const ensureDataFile = () => {
  const dataDir = join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  if (!fs.existsSync(eventsFilePath)) {
    const initialEvents = [
      {
        id: 1,
        title: 'Team Meeting',
        date: new Date(2025, 10, 5).toISOString(),
        color: '#4285f4'
      },
      {
        id: 2,
        title: 'Project Deadline',
        date: new Date(2025, 10, 10).toISOString(),
        color: '#ea4335'
      },
      {
        id: 3,
        title: 'Birthday Party',
        date: new Date(2025, 10, 15).toISOString(),
        color: '#34a853'
      },
      {
        id: 4,
        title: 'Conference',
        date: new Date(2025, 10, 20).toISOString(),
        color: '#fbbc04'
      }
    ];
    fs.writeFileSync(eventsFilePath, JSON.stringify(initialEvents, null, 2));
  }
};

ensureDataFile();

// Read events from file
const readEvents = () => {
  try {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events:', error);
    return [];
  }
};

// Write events to file
const writeEvents = (events) => {
  try {
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing events:', error);
    return false;
  }
};

// API Routes

// Get all events
app.get('/api/events', (req, res) => {
  try {
    const events = readEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get events by date range
app.get('/api/events/range', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const events = readEvents();
    
    if (startDate && endDate) {
      const filtered = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
      });
      res.json(filtered);
    } else {
      res.json(events);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event by ID
app.get('/api/events/:id', (req, res) => {
  try {
    const events = readEvents();
    const event = events.find(e => e.id === parseInt(req.params.id));
    
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event
app.post('/api/events', (req, res) => {
  try {
    const { title, date, color } = req.body;
    
    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date are required' });
    }
    
    const events = readEvents();
    const newEvent = {
      id: Date.now(),
      title,
      date: new Date(date).toISOString(),
      color: color || '#4285f4'
    };
    
    events.push(newEvent);
    
    if (writeEvents(events)) {
      res.status(201).json(newEvent);
    } else {
      res.status(500).json({ error: 'Failed to create event' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
app.put('/api/events/:id', (req, res) => {
  try {
    const { title, date, color } = req.body;
    const events = readEvents();
    const index = events.findIndex(e => e.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    events[index] = {
      ...events[index],
      title: title || events[index].title,
      date: date ? new Date(date).toISOString() : events[index].date,
      color: color || events[index].color
    };
    
    if (writeEvents(events)) {
      res.json(events[index]);
    } else {
      res.status(500).json({ error: 'Failed to update event' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  try {
    const events = readEvents();
    const filteredEvents = events.filter(e => e.id !== parseInt(req.params.id));
    
    if (events.length === filteredEvents.length) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (writeEvents(filteredEvents)) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`📅 Events API available at http://localhost:${PORT}/api/events`);
});

