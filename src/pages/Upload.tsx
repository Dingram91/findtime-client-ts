import React, { ReactElement, useContext, useState, useEffect } from 'react'
import AvatarImage from '../components/AvatarImage'
import { UserContext } from '../contexts/UserContext'
import { getToken } from '../utils/TokenUtils'

interface Props {}

function Upload({}: Props): ReactElement {
    const [imageData, setImageData] = useState<File>()
    const [imageName, setImageName] = useState<string>()
    // const [imageUrl, setImageUrl] = useState<string>()
    const { user, setUser } = useContext(UserContext)

    // useEffect(() => {
    //     if (user && setUser) {
    //         fetch('http://localhost:3000/files/' + imageName, {
    //             method: 'GET',
    //             headers: {
    //                 authToken: getToken(user, setUser),
    //             },
    //         })
    //             .then((response) => {
    //                 return response.blob()
    //             })
    //             .then((blob) => {
    //                 setImageUrl(URL.createObjectURL(blob))
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     }
    // }, [imageName])

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageData(event.target.files[0])
            console.log('set image')
        }
    }

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const data = new FormData()

        data.append('image', imageData!)

        if (user && setUser) {
            fetch('http://localhost:3000/files/upload', {
                method: 'POST',
                headers: {
                    authToken: getToken(user, setUser),
                },
                body: data,
            })
                .then((result) => {
                    return result.json()
                })
                .then((json) => {
                    console.log('uploaded image named: ' + json.fileName)
                    setImageName(json.fileName)
                })
                .catch((error) => {
                    console.log('Error sending file')
                })
        }
    }

    return (
        <div>
            <h1>Upload Page</h1>
            <form onSubmit={formSubmitHandler}>
                <input type="file" onChange={imageChangeHandler} />
                <br />
                <button type="submit">Submit</button>
            </form>
            <AvatarImage imageName={imageName} alt="User Image" />
        </div>
    )
}

export default Upload
