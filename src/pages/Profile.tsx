import { useEffect, useState, ReactElement, useContext } from 'react'
import {
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
    const { user, setUser } = useContext(UserContext)

    const { profile, setProfile, isPending, error } = useProfile()

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
    const handleProfilePicChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            if (profile) {
                setProfile({ ...profile, thumbNail: event.target.files[0] })
            }
        }
    }
    const handleTimeZoneChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (profile)
            setProfile({ ...profile, timeZone: event.target.value as string })
    }

    const uploadImage = () => {
        const data = new FormData()
        data.append('image', profile?.thumbNail!)

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: data,
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                return json.imageUrl
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = () => {
        // upload our image first
        if (profile?.thumbNail) {
            const imageUrl = uploadImage()
        }

        fetch('http://localhost:3000/api/profile/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authToken: user!.token,
            },
            body: JSON.stringify({
                data: profile?.thumbNail,
                contentType: 'image/JPG',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response to image upload:')
                console.dir(data)
            })
            .catch((err) => {
                console.log('Unable to upload image: ', err.message)
            })
    }

    let enterEditMode = () => {
        setEditMode(!editMode)
    }

    let inputStyle = 'w-1/2 p-1 focus:bg-pink-400'
    inputStyle += editMode ? ' bg-pink-300' : ' bg-pink-200'
    const inputStyleDisabled = 'w-1/2 bg-pink-200 p-1'
    const labelStyle = 'w-1/2 bg-pink-200 p-1 focus'

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={5} className={classes.frame}>
                <form key={124124}>
                    <Grid key={12365267} container>
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
                            <Button variant="contained" component="label">
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleProfilePicChange}
                                />
                            </Button>
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
                                    <MenuItem value={zone}>{zone}</MenuItem>
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
