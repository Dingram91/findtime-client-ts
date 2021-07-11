/// <reference types="react-scripts" />

interface IUser {
  token: string;
  refresh: string;
}

type UserContextType = {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
};
interface ProfileInterface {
  username: string;
  firstName: string;
  lastName: string;
  thumbNail: string;
  joined: Date;
  timeZone: string;
  attending: string[];
  invited: string[];
  defaultSchedule: { start: Date; end: Date }[];
}
