import React, { useState } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2025, 10, 5), // November 5, 2025
      color: '#4285f4'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2025, 10, 10),
      color: '#ea4335'
    },
    {
      id: 3,
      title: 'Birthday Party',
      date: new Date(2025, 10, 15),
      color: '#34a853'
    },
    {
      id: 4,
      title: 'Conference',
      date: new Date(2025, 10, 20),
      color: '#fbbc04'
    }
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  return (
    <div className="app">
      <Calendar events={events} onAddEvent={addEvent} />
    </div>
  );
}

export default App;
