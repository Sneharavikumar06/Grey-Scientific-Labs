import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-image: url('/images.png');
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
  }
`;

const Input = styled.input`
  width: 95%;
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: #64b5f6;
    box-shadow: 0 0 8px rgba(100, 181, 246, 0.8);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 95%;
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  resize: vertical;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: #64b5f6;
    box-shadow: 0 0 8px rgba(100, 181, 246, 0.8);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #64b5f6, #42a5f5);
    transform: translateY(-6px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
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
