import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import './App.css';

const API_URL = 'http://localhost:5006/api';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      // Convert date strings back to Date objects
      const eventsWithDates = data.map(event => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(eventsWithDates);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const savedEvent = await response.json();
      // Convert date string back to Date object
      const eventWithDate = {
        ...savedEvent,
        date: new Date(savedEvent.date)
      };
      setEvents([...events, eventWithDate]);
      setError(null);
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.5rem'
        }}>
          Loading events...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c00',
          padding: '1rem',
          margin: '1rem',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <Calendar events={events} onAddEvent={addEvent} />
    </div>
  );
}

export default App;
