import { ReactElement, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import useLogout from '../utils/CustomHooks/useLogout'

function Logout(): ReactElement {
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()
    const { isPending, error } = useLogout()

    return (
        <div>
            {!user && isPending && <p>Not logged in....</p>}
            {isPending && user && <p>Logging out...</p>}
            {!isPending && error && <p>{error}</p>}
            {!isPending && !error && <p>You have been logged out.</p>}
        </div>
    )
}

export default Logout
