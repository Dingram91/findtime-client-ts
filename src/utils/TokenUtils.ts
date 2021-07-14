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
    let token = user.token
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
            token = data.authToken
            setUser({
                token: data.authToken,
                refresh: data.refreshToken,
            })
        })
        .catch((error) => {
            console.log(
                'Error encountered while refreshing token: ' + error.message
            )
        })

    return token
}

export const getToken = (
    user: IUser,
    setUser: (user: IUser | undefined) => void
) => {
    let token = user.token
    if (checkIfSessionExpired(user)) {
        token = refreshSession(user, setUser)
    }
    return token
}
