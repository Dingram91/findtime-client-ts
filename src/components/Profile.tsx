import React from 'react'

type props = {
    user: IUser,
}

function Profile(props: props) {
    return (
        <div>
            <h1>Welcome to your Profile!</h1>
            <p>user is {(props.user) ? (props.user.username) : ("Blank")}</p>
            <p>token is {(props.user) ? (props.user.token) : ("Blank")}</p>
        </div>
    )
}

export default Profile