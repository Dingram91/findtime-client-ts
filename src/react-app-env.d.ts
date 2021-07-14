/// <reference types="react-scripts" />

interface IUser {
    token: string
    refresh: string
}

interface INameAndImage {
    userName: string
    avatarImage: string
}

type UserContextType = {
    user: IUser | undefined
    setUser: (user: IUser | undefined) => void
    nameAndImage: INameAndImage | undefined
    setNameAndImage: (nameAndImage: INameAndImage | undefined) => void
}
interface ProfileInterface {
    username: string
    firstName: string
    lastName: string
    thumbNail: string
    joined: Date
    timeZone: string
    attending: string[]
    invited: string[]
    defaultSchedule: { start: Date; end: Date }[]
}
