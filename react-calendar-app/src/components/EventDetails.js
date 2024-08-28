import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EventContext } from '../context/EventContext';

const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);

  console.log('Event ID from URL:', id); // Debugging line
  console.log('Events in Context:', events); // Debugging line
  
  const event = events.find((event) => event.id === id);
  const navigate = useNavigate();

  if (!event) {
    return <p>Event not found</p>;
  }

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <DetailsContainer>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Description: {event.description}</p>
      <BackButton onClick={handleBackClick}>Back</BackButton>
    </DetailsContainer>
  );
};

export default EventDetails;
