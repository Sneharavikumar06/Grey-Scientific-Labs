import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import CalendarPage from './pages/CalendarPage';
import EventDetailsPage from './pages/EventDetailsPage';

const App = () => {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
