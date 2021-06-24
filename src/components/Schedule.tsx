import React from 'react'
import ScheduleDay from './ScheduleDay';

interface Props {
    schedule: ProfileInterface["defaultSchedule"]
}

const Schedule = (props: Props) => {
    return (
        <div className="flex flex-col bg-gray-600">
            <div className="flex justify-between">
                <div className="w-28 bg-red-300">
                    Sunday
                    <ScheduleDay />
                </div>
                <div className="w-28 bg-red-300">
                    Monday
                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="w-28 bg-red-300">
                    Tuesday
                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="w-28 bg-red-300">
                    Wednesday
                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="w-28 bg-red-300">
                    Thursday
                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="w-28 bg-red-300">
                    Friday
                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="w-28 bg-red-300">
                    Saturday
                    <div className="flex flex-col">

                    </div>
                </div>
            </div>
        </div>
        )
}

export default Schedule
