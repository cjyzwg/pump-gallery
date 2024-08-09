"use client"; // Ensure this component is a Client Component

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerComponentProps {
  initialDate: Date;
  onDateChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ initialDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="md:flex justify-center items-center mb-4 w-full">
      {/* Date Display */}
      <div className="text-center bg-sky-100 dark:bg-slate-700 p-2 rounded-t w-full max-w-md" style={{ minHeight: '40px' }}>
        <span className="text-lg font-medium">{formatDate(selectedDate)}</span>
      </div>
      {/* Date Picker */}
      <div className="w-full max-w-md text-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border border-green-300 rounded"
          calendarClassName="my-custom-calendar"
        />
      </div>
      {/* Add some custom styling for date picker if needed */}
      <style jsx global>{`
        .my-custom-calendar {
          min-height: 40px; /* Ensure the calendar has a minimum height */
        }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
