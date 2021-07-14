import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { getToken } from '../utils/TokenUtils'

interface Props {
    imageName: string | undefined
    alt?: string
}

function AvatarImage({ imageName, alt }: Props): ReactElement {
    const [imageUrl, setImageUrl] = useState<string>()
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (user && setUser && imageName) {
            fetch('http://localhost:3000/files/' + imageName, {
                method: 'GET',
                headers: {
                    authToken: getToken(user, setUser),
                },
            })
                .then((response) => {
                    return response.blob()
                })
                .then((blob) => {
                    setImageUrl(URL.createObjectURL(blob))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [imageName])

    return <img src={imageUrl} alt={alt} />
}

export default AvatarImage
