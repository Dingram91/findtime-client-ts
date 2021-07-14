import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { refreshSession, checkIfSessionExpired } from '../TokenUtils'

const useProfile = () => {
    const { user, setUser, setNameAndImage } = useContext(UserContext)

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // if the users auth token is expired refresh it then do logout
        if (user) {
            if (checkIfSessionExpired(user)) {
                refreshSession(user!, setUser!)
            } else {
                setTimeout(() => {
                    fetch('http://localhost:3000/api/user/logout', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authToken: user!.token,
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw Error('Unable to fetch profile data')
                            }
                            return response.json()
                        })
                        .then((data) => {
                            setIsPending(false)
                            setError(null)
                            setUser!(undefined)
                            setNameAndImage!(undefined)
                        })
                        .catch((err) => {
                            setIsPending(false)
                            setError(err.message)
                        })
                }, 1000)
            }
        }
    }, [user, setUser])
    return { isPending, error }
}

export default useProfile
