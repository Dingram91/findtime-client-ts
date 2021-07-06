/// <reference types="react-scripts" />

interface IUser {
  token: string;
  refresh: string;
}

type UserContextType = {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
};

enum TIMEZONE {
  AST,
  EST,
  EDT,
  CST,
  CDT,
  MST,
  MDT,
  PST,
  AKDT,
  HST,
  HAST,
  HADT,
  SST,
  SDT,
  CHST,
}

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
