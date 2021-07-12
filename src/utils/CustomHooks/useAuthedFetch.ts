import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import { checkIfSessionExpired, refreshSession } from '../TokenUtils'

export default (url: string, options: {}) => {
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const { user, setUser } = useContext(UserContext)

    let data = {}

    useEffect(() => {
        // if the users auth token is expired refresh it
        if (user && setUser) {
            if (checkIfSessionExpired(user!)) {
                console.log('Session expired')
                refreshSession(user!, setUser!)
            } else {
                // use a timeout for request
                setTimeout(() => {
                    fetch(url, {
                        ...options,
                        headers: {
                            authToken: user!.token,
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw Error('Unable to fetch data')
                            }
                            return response.json()
                        })
                        .then((data: {}) => {
                            data = data
                            setIsPending(false)
                            setError(null)
                        })
                        .catch((err) => {
                            setIsPending(false)
                            setError(err.message)
                        })
                }, 1000)
            }
        }
    }, [user, setUser])
    return { data, isPending, error }
}
