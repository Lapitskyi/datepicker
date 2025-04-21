import React, {useState} from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(
        new Date(new Date().getTime() + 60 * 60 * 1000)
    );

    const now = new Date();

    const isStartToday =
        startDate && startDate.toDateString() === now.toDateString();

    const isEndSameDay =
        startDate &&
        endDate &&
        endDate.toDateString() === startDate.toDateString();

    return (
        <div className="app">
            <div className='wrapper'>
                <label>Start Date & Time</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => {
                        setStartDate(date);
                        if (date && endDate && date > endDate) {
                            setEndDate(new Date(date.getTime() + 60 * 60 * 1000));
                        }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    minDate={now}
                    minTime={
                        isStartToday
                            ? now
                            : new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    maxTime={new Date(new Date().setHours(23, 45))}
                    placeholderText="Select start date & time"
                />
            </div>

            <div className='wrapper'>
                <label>End Date & Time</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    minDate={startDate ?? now}
                    minTime={
                        isEndSameDay && startDate
                            ? startDate
                            : new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    maxTime={new Date(new Date().setHours(23, 45))}
                    placeholderText="Select end date & time"
                />
            </div>
        </div>
    );}

export default App;
