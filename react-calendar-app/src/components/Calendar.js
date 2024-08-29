import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #e1bee7);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderButton = styled.button`
  padding: 10px 15px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }
`;

const MonthYear = styled.div`
  font-size: 24px;
  color: #333;
`;

const MonthYearText = styled.div`
  font-size: 40px;
  color: #333;
`;

const YearSelect = styled.select`
  background-color: linear-gradient(135deg, #e0f7fa, #e1bee7);
  color: black;
  padding: 10px;
  margin-top: 10px;
  margin-right: 15px;
  border-radius: 5px;
  font-size: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: linear-gradient(135deg, #e0f7fa, #e1bee7);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
  margin-bottom: 10px;
`;

const DayOfWeek = styled.div`
  font-weight: bold;
  color: #555;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
`;

const Day = styled.div`
  padding: 15px;
  border: 2px solid #b39ddb;
  border-radius: 8px;
  text-align: center;
  background-color: #ffffff;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f3e5f5;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Event = styled.div`
  background-color: #ff7043;
  color: white;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff5722;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handleMonthChange = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleYearChange = (e) => {
    setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysArray = [...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).fill(null)];

  const filteredEvents = events.filter(event => 
    new Date(event.date).getFullYear() === currentDate.getFullYear() && 
    new Date(event.date).getMonth() === currentDate.getMonth()
  );

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

  return (
    <CalendarContainer>
      <Header>
        <HeaderButton onClick={() => handleMonthChange(-1)}>Previous</HeaderButton>
        <MonthYear>
          <MonthYearText>
            <div>{currentDate.toLocaleDateString('en-US', { month: 'long' })}</div>
          </MonthYearText>
          <YearSelect value={currentDate.getFullYear()} onChange={handleYearChange}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </YearSelect>
        </MonthYear>
        <HeaderButton onClick={() => handleMonthChange(1)}>Next</HeaderButton>
      </Header>
      <DaysOfWeek>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <DayOfWeek key={day}>{day}</DayOfWeek>
        ))}
      </DaysOfWeek>
      <DaysContainer>
        {daysArray.map((_, index) => {
          const day = index - firstDayOfMonth + 1;
          const hasEvents = filteredEvents.some(event => new Date(event.date).getDate() === day && new Date(event.date).getMonth() === currentDate.getMonth());

          return (
            <Day key={index}>
              {day > 0 && day <= daysInMonth ? (
                <>
                  {day}
                  {hasEvents && filteredEvents.filter(event => new Date(event.date).getDate() === day).map(event => (
                    <Link to={`/events/${event.id}`} key={event.id}>
                      <Event>{event.title}</Event>
                    </Link>
                  ))}
                </>
              ) : (
                <>&nbsp;</>
              )}
            </Day>
            
          );
        })}
      </DaysContainer>
    </CalendarContainer>
  );
};

export default Calendar;
