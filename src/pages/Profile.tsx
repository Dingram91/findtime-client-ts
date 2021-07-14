import { useState, ReactElement, useContext, useEffect } from 'react'
import {
    Avatar,
    Button,
    Container,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import useProfile from '../utils/CustomHooks/useProfile'
import { UserContext } from '../contexts/UserContext'
import { getToken } from '../utils/TokenUtils'
import Resizer from 'react-image-file-resizer'

type props = {}

const useStyles = makeStyles((theme) => ({
    paper: {
        // backgroundColor: "lightgreen",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    image: {
        // width: '100px',
        // height: '100px',
    },
    disabled: {
        backgroundColor: 'pink',
    },
    form: {
        // backgroundColor: "lightblue",
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    frame: {
        padding: '2%',
        margin: '2%',
    },

    debug: {
        backgroundColor: 'red',
    },
}))

function Profile(props: props): ReactElement {
    const classes = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()
    const { user, setUser } = useContext(UserContext)

    const { profile, setProfile, isPending, error } = useProfile()

    useEffect(() => {
        if (profile?.thumbNail && user && setUser) {
            console.log('Trying to set image')
            fetch('http://localhost:3000/files/' + profile.thumbNail, {
                method: 'GET',
                headers: {
                    authToken: getToken(user, setUser),
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    setImageUrl(URL.createObjectURL(blob))
                })
        }
    }, [profile?.thumbNail])

    const TIMEZONES = [
        'AST',
        'EST',
        'EDT',
        'CST',
        'CDT',
        'MST',
        'MDT',
        'PST',
        'AKDT',
        'HST',
        'HAST',
        'HADT',
        'SST',
        'SDT',
        'CHST',
    ]

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (profile && editMode)
            setProfile({ ...profile, username: event.target.value })
    }
    const handleFirstNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (profile && editMode)
            setProfile({ ...profile, firstName: event.target.value })
    }
    const handleLastNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (profile && editMode)
            setProfile({ ...profile, lastName: event.target.value })
    }
    const handleProfilePicChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            console.log('Uploading image')
            if (profile) {
                const userImage = await uploadImage(event.target.files[0])
                console.log('Uploaded user image named: ' + userImage)
                setProfile({
                    ...profile,
                    thumbNail: userImage,
                })
            }
        }
    }
    const handleTimeZoneChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (profile)
            setProfile({ ...profile, timeZone: event.target.value as string })
    }

    const resizeFile = (file: File): Promise<Blob> =>
        new Promise<Blob>((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                'JPEG',
                100,
                0,
                (uri) => {
                    const b: Blob = uri as Blob
                    resolve(b)
                },
                'blob'
            )
        })

    const uploadImage = async (image: File) => {
        let fileName: string = ''
        try {
            const resizedImage = await resizeFile(image)
            console.log(resizedImage)
            const data = new FormData()
            data.append('image', resizedImage)

            if (user && setUser) {
                console.log('user and ')
                await fetch('http://localhost:3000/files/upload', {
                    method: 'POST',
                    headers: {
                        authToken: getToken(user, setUser),
                    },
                    body: data,
                })
                    .then((response) => {
                        console.log(response)
                        return response.json()
                    })
                    .then((json) => {
                        console.dir(json)
                        fileName = json.fileName
                        console.dir('filename: ' + fileName)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            console.log('Upload url: ' + fileName)
        } catch (err) {}

        return fileName
    }

    const handleSubmit = async () => {
        console.log('User thumbnail: ' + profile?.thumbNail)
        if (profile && user && setUser) {
            fetch('http://localhost:3000/api/profile/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authToken: getToken(user, setUser),
                },
                body: JSON.stringify({
                    username: profile.username,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    thumbNail: profile.thumbNail,
                    timeZone: profile.timeZone,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        console.dir(data.message)
                    }
                })
                .catch((err) => {
                    console.log('Unable to submit edit: ', err.message)
                })
        }
    }

    let enterEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={5} className={classes.frame}>
                <form>
                    <Grid container justify="center">
                        <Avatar src={imageUrl} alt="user Image" />
                        <Grid container item xs={12} justify="center">
                            <Grid item>
                                <img
                                    src={imageUrl}
                                    alt="Profile Image"
                                    className={classes.image}
                                />
                            </Grid>
                        </Grid>
                        {/* Profile Picture */}

                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Profile Picture
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                component="label"
                                disabled={!editMode}
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleProfilePicChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={profile?.username}
                                disabled={!editMode}
                                onChange={handleUsernameChange}
                                error={false}
                                helperText="Incorrect Username"
                            />
                        </Grid>
                        {/* Item 2 */}
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                First Name
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={profile?.firstName}
                                disabled={!editMode}
                                onChange={handleFirstNameChange}
                            />
                        </Grid>
                        {/* Item 3 */}
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Last Name
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={profile?.lastName}
                                disabled={!editMode}
                                onChange={handleLastNameChange}
                            />
                        </Grid>
                        {/* Item 4 */}
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Joined
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={profile?.joined} disabled />
                        </Grid>
                        {/* Item 6 */}
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Time Zone
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                value={profile?.timeZone}
                                onChange={handleTimeZoneChange}
                                disabled={!editMode}
                            >
                                {TIMEZONES.map((zone) => (
                                    <MenuItem key={zone} value={zone}>
                                        {zone}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* Item 7 */}
                        <Grid item xs={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                align="center"
                            >
                                Default Schedule
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={profile?.defaultSchedule}
                                disabled={!editMode}
                            />
                        </Grid>
                        {/* Buttons */}
                        <Grid
                            item
                            container
                            component="div"
                            justify="space-around"
                            spacing={0}
                        >
                            <Grid item xs={3}>
                                <Button onClick={enterEditMode}>Edit</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    disabled={!editMode}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Profile
