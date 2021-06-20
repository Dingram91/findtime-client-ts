import React, {useState} from 'react'

// const getNumberOfDaysForMonth = (monthNumber) => {
    
// }

function Calendar() {
    const [dayContent, setDayContent] = useState(new Array());
    console.log(new Date().getMonth())
    return (
        <div className="flex w-full bg-blue-400">
            Test text
        </div>
    )
}

export default Calendar
