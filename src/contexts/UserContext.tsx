import React, { createContext, useState } from "react";

export const UserContext = createContext<Partial<UserContextType>>({});

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | undefined>({
    token: ""
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
