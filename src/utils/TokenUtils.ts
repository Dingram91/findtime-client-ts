import jwt from 'jsonwebtoken'

export const checkIfSessionExpired = (user: IUser) => {
    if (user.token && jwt.decode(user.token)) {
        const decoded = jwt.decode(user.token) as jwt.JwtPayload
        if (decoded && decoded?.exp) {
            const expiration = decoded.exp
            const current = new Date().getTime() / 1000
            return current > expiration
        }
    }
    return false
}

export const refreshSession = (
    user: IUser,
    setUser: (user: IUser | undefined) => void
) => {
    console.log('Refreshing Session')
    fetch('http://localhost:3000/api/user/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            refreshToken: user.refresh,
        },
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setUser({
                token: data.authToken,
                refresh: data.refreshToken,
            })
        })
        .catch((error) => {
            console.log('Unable to refresh token')
            console.log(error.message)
        })
}
