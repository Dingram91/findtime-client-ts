/// <reference types="react-scripts" />

interface IUser {
  username: string;
  token: string;
}

type UserContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};
