import { useEffect, useState, useContext } from 'react'
import jwt from 'jsonwebtoken'
import { UserContext } from '../../contexts/UserContext'
import { refreshSession, checkIfSessionExpired } from '../TokenUtils'

const useProfile = () => {
    const { user, setUser } = useContext(UserContext)

    const [profile, setProfile] = useState<ProfileInterface | undefined>({
        username: '',
        firstName: '',
        lastName: '',
        thumbNail: '',
        joined: new Date(),
        timeZone: '',
        attending: [],
        invited: [],
        defaultSchedule: [],
    })

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // if the users auth token is expired refresh it
        if (checkIfSessionExpired(user!)) {
            refreshSession(user!, setUser!)
        } else {
            setTimeout(() => {
                fetch('http://localhost:3000/api/profile', {
                    method: 'GET',
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
                        setProfile({
                            username: data.username,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            joined: data.joined,
                            thumbNail: data.thumbNail,
                            timeZone: data.timeZone,
                            invited: data.invited,
                            attending: data.attending,
                            defaultSchedule: data.defaultSchedule,
                        })
                        setIsPending(false)
                        setError(null)
                    })
                    .catch((err) => {
                        setIsPending(false)
                        setError(err.message)
                    })
            }, 1000)
        }
    }, [user, setUser])
    return { profile, setProfile, isPending, error }
}

export default useProfile
