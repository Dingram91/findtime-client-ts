import {useState} from 'react'
import {startOfWeek, lastDayOfMonth, endOfWeek, isBefore, addDays} from 'date-fns'

enum MONTHS {
    January, February, March, April, May, June, July, August, September, October, November, December
}

function Calendar() {
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getUTCFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

    const renderCalDays = () => {
        const firstDayOfMonth = new Date(`${selectedMonth + 1}/1/${selectedYear}`)
        const startOfCal = startOfWeek(firstDayOfMonth);
        const endOfCal = endOfWeek(lastDayOfMonth(firstDayOfMonth)); 
        let monthDaysArray: Date[] = [];
        for(let d = startOfCal; isBefore(d, endOfCal); d = addDays(d, 1)) {
            monthDaysArray.push(d);
        }
        return monthDaysArray;
    }

    
    const incrementMonth = () => {
        let increasedMonth = (selectedMonth + 1);
        if(increasedMonth > 11) { 
            setSelectedYear(selectedYear + 1);
            increasedMonth %= 12;
        }
        setSelectedMonth(increasedMonth);
    }
    const decrementMonth = () => {
        setSelectedMonth((selectedMonth - 1) % 11);
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between w-1/3 bg-blue-400 text-blue-50">
                <button className="bg-blue-300 hover:bg-blue-500 p-3 text-4xl" onClick={decrementMonth}>&#8592;</button>
                <div className="text-center text-2xl">{MONTHS[selectedMonth]}<br />{selectedYear}</div>
                <button className="bg-blue-300 hover:bg-blue-500 p-3 text-4xl" onClick={incrementMonth}>&#8594;</button>
            </div>
            <div className="grid grid-cols-7 bg-gray-200 w-1/3">
                {renderCalDays().map((day, index) => <div className="p-6 place-self-center hover:bg-gray-300" key={index}>{day.getDate()}</div>)}
            </div>
        </div>
    )
}

export default Calendar
