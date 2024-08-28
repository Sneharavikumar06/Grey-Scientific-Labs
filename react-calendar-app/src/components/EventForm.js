import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #42a5f5, #2196f3);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(135deg, #64b5f6, #42a5f5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const EventForm = ({ event = {}, onClose, addNewEvent, updateEvent }) => {
  const [title, setTitle] = useState(event.title || '');
  const [date, setDate] = useState(event.date || '');
  const [time, setTime] = useState(event.time || '');
  const [location, setLocation] = useState(event.location || '');
  const [description, setDescription] = useState(event.description || '');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setDescription(event.description);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, date, time, location, description };
    if (event.id) {
      await updateEvent(event.id, newEvent);
    } else {
      await addNewEvent(newEvent);
    }
    onClose();
  };

  return (
    <FormContainer>
      <h2>{event.id ? 'Edit Event' : 'Add Event'}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="Event Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          type="time"
          placeholder="Event Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit">Save Event</Button>
      </form>
    </FormContainer>
  );
};

export default EventForm;
