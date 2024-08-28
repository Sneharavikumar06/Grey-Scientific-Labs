import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import useEvents from '../hooks/useEvents';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 30px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const EditButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #f0932b, #f39c12);
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(135deg, #ffbe76, #f39c12);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [event, setEvent] = useState(null);
  const { events, deleteEvent } = useEvents();

  useEffect(() => {
    const foundEvent = events.find(event => event.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      console.error(`Event with ID ${id} not found`);
    }
  }, [id, events]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await deleteEvent(id);
    navigate('/');
  };

  return (
    <PageContainer>
      {event ? (
        <>
          {isEditing ? (
            <EventForm event={event} onClose={handleCloseForm} />
          ) : (
            <>
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>

              <EditButton onClick={handleEditClick}>Edit Event</EditButton>
              <DeleteButton onClick={handleDeleteClick}>Delete Event</DeleteButton>
            </>
          )}
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </PageContainer>
  );
};

export default EventDetailsPage;

