import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ events, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventColor, setNewEventColor] = useState('#4285f4');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (newEventTitle.trim() && selectedDate) {
      onAddEvent({
        title: newEventTitle,
        date: selectedDate,
        color: newEventColor
      });
      setNewEventTitle('');
      setNewEventColor('#4285f4');
      setShowEventModal(false);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = isSameDay(date, today);
      const dayEvents = getEventsForDate(date);

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="event-dot"
                style={{ backgroundColor: event.color }}
                title={event.title}
              >
                <span className="event-title">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Event Calendar</h1>
        <div className="calendar-controls">
          <button onClick={goToToday} className="today-btn">Today</button>
          <button onClick={previousMonth} className="nav-btn">‹</button>
          <h2 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="nav-btn">›</button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-days-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderCalendarDays()}
        </div>
      </div>

      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Event</h3>
            <p className="modal-date">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <input
              type="text"
              placeholder="Event title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="event-input"
              autoFocus
            />
            <div className="color-picker">
              <label>Color:</label>
              <div className="color-options">
                {['#4285f4', '#ea4335', '#34a853', '#fbbc04', '#9b51e0', '#00bcd4'].map(color => (
                  <div
                    key={color}
                    className={`color-option ${newEventColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewEventColor(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowEventModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleAddEvent} className="add-btn">
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

