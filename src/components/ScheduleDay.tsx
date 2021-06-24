import React, { ReactElement } from 'react'

interface Props {
    
}

function ScheduleDay({}: Props): ReactElement {

    let events = [["00:00", "1:30"], ["02:30", "04:30"], ["04:30", "05:00"], ["14:30", "16:45"]]

    let divArray = [];
    for(let x=11; x < 35; x++) {
        let display = x%12 + 1
        divArray.push(<div className="h-8 w-12 border border-b-1 border-black hover:bg-yellow-300">{display} {x<23? "am" : "pm"}</div>)
    }

    let eventArray = [];
    let openEvent = false;
    events.sort()
    let parts = events[0][0].split(":");
    console.log(parts[1])
    let eventIndex = 0;
    

    eventArray.push(<div className="h-1/2 w-full bg-green-300"></div>)


    return (
        <div className="flex">
            <div className="flex flex-col">
                {divArray.map(x => x)}
            </div>
            <div className="flex w-full flex-col">
                {eventArray.map(x => x)}
            </div>
        </div>
    )
}

export default ScheduleDay
