import React, { createContext, useState } from 'react'
import useLocalStorage from '../utils/CustomHooks/useLocalStorage'

export const UserContext = createContext<Partial<UserContextType>>({})

type Props = {
    children: React.ReactNode
}

export const UserProvider = ({ children }: Props) => {
    // const [user, setUser] = useState<IUser | undefined>(undefined);
    const [user, setUser] = useLocalStorage('user', undefined)
    const [nameAndImage, setNameAndImage] = useLocalStorage(
        'nameAndImage',
        undefined
    )

    return (
        <UserContext.Provider
            value={{ user, setUser, nameAndImage, setNameAndImage }}
        >
            {children}
        </UserContext.Provider>
    )
}
