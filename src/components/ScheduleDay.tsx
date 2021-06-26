import React, { ReactElement } from 'react'

const MINUTES_PER_DAY = 1440; // This is the number of minutes in a day
interface Props {
    events: {start: number, end: number, description: string}[]; // This is an array of start-end time + description objects representing time the user has something planned
}
// example data
// [{start: 60*8, end: 60*17, description: "Work"}, {start: 60*18, end: 60*19, description: "Make Dinner"}]

// TODO: Make sure events are sorted and non-overlapping

function ScheduleDay({events}: Props): ReactElement {


    let timeDivs = [];
    for(let x=11; x < 35; x++) {
        let display = x%12 + 1
        timeDivs.push(<div className=" w-12 border border-b-1 border-black hover:bg-yellow-300">{display} {x<23? "am" : "pm"}</div>)
    }

    let eventsColumn = [];
    const DIV_STACK_HEIGHT = 36; // height of times in rem units (1.5rem = h-6 -- *24)
    let lastEventPosition = 0;
    for(let i = 0; i < events.length; i++) {
        if(lastEventPosition < events[i].start) // if event doesn't start where cursor is insert a filler element
        {
            let remSpaceNeeded = (events[i].start - lastEventPosition) / 40; 
            let space = ""
            eventsColumn.push(<div className={`bg-green-200 h-${remSpaceNeeded}`}></div>)
        } 
    }




    return (
        <div className="flex">
            <div className="flex flex-col">
                {timeDivs.map(x => x)}
            </div>
            <div className="flex w-full flex-col">
                {eventsColumn.map(x => x)}
            </div>
        </div>
    )
}

export default ScheduleDay
