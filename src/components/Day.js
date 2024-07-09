import React, { useState, useEffect } from 'react';
import { getHebrewDate } from '../utils/calendar';
import EventPopup from './EventPopup';

const Day = ({ day, month, events, isPreviousMonth, onEventChange, onDayClick, isSelected }) => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(isSelected);
    }, [isSelected]);

    const gregorianDate = new Date(day);
    const formattedDate = gregorianDate.toISOString().split('T')[0];
    const dayEvents = events.filter(event => event.date === formattedDate);
    const hebrewDate = getHebrewDate(gregorianDate);

    const gregorianDay = gregorianDate.getDate();
    const isToday = new Date().toDateString() === gregorianDate.toDateString();

    const handleDayClick = (e) => {
        e.stopPropagation();
        onDayClick(day);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        onDayClick(null);
    };

    return (
        <div 
            className={`day ${isPreviousMonth ? 'previous-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleDayClick}
        >
            {day && (
                <>
                    <div className='datehebrewandforeign'>
                        <span className="date">{hebrewDate.split(' ')[0]}</span>
                        <span className="gregorian-date">{gregorianDay}</span>
                    </div>
                    {dayEvents.length > 0 && (
                        dayEvents.map((event, index) => (
                            <div key={index} className="event">
                                <span className="description">{event.description}</span>
                            </div>
                        ))
                    )}
                    {showPopup && (
                        <EventPopup 
                            day={day}
                            events={dayEvents}
                            onClose={handleClosePopup}
                            onEventChange={onEventChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Day;