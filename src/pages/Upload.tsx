import React, { ReactElement, useState } from 'react'

interface Props {
    
}

function Upload({}: Props): ReactElement {

    const [imageData, setImageData] = useState<File>();

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setImageData(event.target.files[0]);
            console.log("set image");
        }
    }

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const data = new FormData();

        data.append('image', imageData!);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: data
        })
        .then((result) => {
            console.log("Sent File Success");
        })
        .catch((error) => {
            console.log("Error sending file");
        });
    }

    return (
        <div>
            <h1>Upload Page</h1>
            <form onSubmit={formSubmitHandler}>
                <input type="file" onChange={imageChangeHandler} />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Upload
