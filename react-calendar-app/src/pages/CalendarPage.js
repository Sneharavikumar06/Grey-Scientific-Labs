import React, { useState, useEffect, useCallback } from 'react';
import Calendar from '../components/Calendar';
import EventForm from '../components/EventForm';
import styled from 'styled-components';
import useEvents from '../hooks/useEvents';

const PageContainer = styled.div`
  padding: 20px;
  background-image: url('/images.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

const CalendarTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 50px;
  color: #333;
`;

const AddEventButton = styled.button`
  padding: 12px 25px;
  background: linear-gradient(135deg, #42a5f5, #2196f3);
  color: black;
  border: none;
  border-radius: 8px;
  margin-bottom: 25px;
  margin-left: 500px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(135deg, #64b5f6, #42a5f5);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const FilterSelect = styled.select`
  padding: 12px 25px;
  background: linear-gradient(135deg, #42a5f5, #2196f3);
  color: black;
  border: none;
  border-radius: 8px;
  margin-bottom: 25px;
  margin-left: 100px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(135deg, #64b5f6, #42a5f5);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CalendarPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter, setEvents] = useState('');
  const { addNewEvent, fetchEvents, events } = useEvents(); 

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };
  
    loadEvents();
  }, []);

  
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
    fetchEvents(); 
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <PageContainer>
      <CalendarTitle>My Calendar</CalendarTitle>
      <AddEventButton onClick={handleAddClick}>Add Event</AddEventButton>
      <FilterSelect onChange={handleFilterChange} value={filter}>
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </FilterSelect>
      {isAdding && <EventForm onClose={handleCloseForm} addNewEvent={addNewEvent} />}
      <Calendar events={events} filter={filter} />
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </PageContainer>
  );
};

export default CalendarPage;
