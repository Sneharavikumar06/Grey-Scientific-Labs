import { useContext } from 'react';
import EventContext from '../context/EventContext';

const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export default useEvents;
