import React, { createContext, useState, useEffect } from 'react';
import { fetchEvents as fetchEventsApi, addEvent, editEvent, deleteEvent } from '../api'; // Ensure this import is correct

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEventsApi(); // Use the correct function name
        setEvents(events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const addNewEvent = async (event) => {
    const newEvent = await addEvent(event);
    setEvents([...events, newEvent]);
  };

  const updateEvent = async (id, updatedEvent) => {
    const event = await editEvent(id, updatedEvent);
    setEvents(events.map(e => e.id === id ? event : e));
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, loading, addNewEvent, updateEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
