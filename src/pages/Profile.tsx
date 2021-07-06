import { useEffect, useState, ReactElement, useContext } from 'react';
import { Button, Container, Grid, makeStyles, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import useProfile from '../utils/useProfile';
import { UserContext } from '../contexts/UserContext';

type props = {
}

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
    padding: "2%",
    margin: "2%"
  },

  debug: {
    backgroundColor: 'red'
  },
}));

function Profile(props: props): ReactElement {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const {profile, setProfile, isPending, error} = useProfile(user!, setUser!);

    const TIMEZONES = [
        "AST",
        "EST",
        "EDT",
        "CST",
        "CDT",
        "MST",
        "MDT",
        "PST",
        "AKDT",
        "HST",
        "HAST",
        "HADT",
        "SST",
        "SDT",
        "CHST",
    ]

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(profile && editMode) setProfile({ ...profile, username: event.target.value });
      };
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(profile && editMode) setProfile({ ...profile, firstName: event.target.value });
      };
      const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(profile && editMode) setProfile({ ...profile, lastName: event.target.value });
      };
      const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(profile && editMode) setProfile({ ...profile, thumbNail: event.target.value });
      };
      const handleTimeZoneChange = (event: React.ChangeEvent<{ value: unknown}>) => {
        
        if(profile) setProfile({ ...profile, timeZone: event.target.value as string});
      };

      const handleSubmit = () => {
        console.log("Submitted form!")
      }


    let enterEditMode = () => {
      setEditMode(!editMode);
    }

    let inputStyle = "w-1/2 p-1 focus:bg-pink-400"
    inputStyle += (editMode)? " bg-pink-300" : " bg-pink-200" 
    const inputStyleDisabled = "w-1/2 bg-pink-200 p-1"
    const labelStyle = "w-1/2 bg-pink-200 p-1 focus"

    return (
          <Container component="main" maxWidth="sm">
            <Paper elevation={5} className={classes.frame}>
              <form>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Username</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.username} disabled={!editMode} onChange={handleUsernameChange} error={false} helperText="Incorrect Username"  />
                  </Grid>
                  {/* Item 2 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >First Name</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.firstName} disabled={!editMode} onChange={handleFirstNameChange} />
                  </Grid>
                  {/* Item 3 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Last Name</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.lastName} disabled={!editMode} onChange={handleLastNameChange} />
                  </Grid>
                  {/* Item 4 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Joined</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.joined} disabled />
                  </Grid>
                  {/* Item 5 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Profile Picture</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.thumbNail} disabled={!editMode} onChange={handleProfilePicChange} />
                  </Grid>
                  {/* Item 6 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Time Zone</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      value={profile?.timeZone}
                      onChange={handleTimeZoneChange}
                      disabled={!editMode}
                      >
                        {TIMEZONES.map(zone => (<MenuItem value={zone}>{zone}</MenuItem>))}
                      </Select>
                  </Grid>
                  {/* Item 7 */}
                  <Grid item xs={6}>
                    <Typography component="h3" variant="h6" align="center" >Default Schedule</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={profile?.defaultSchedule} disabled={!editMode} />
                  </Grid>
                  {/* Buttons */}
                  <Grid item container component='div' justify="space-around" spacing={0}>
                    <Grid item xs={3} >
                      <Button onClick={enterEditMode}>Edit</Button>
                    </Grid>
                    <Grid item xs={3} justify="center">
                      <Button disabled={!editMode}>Submit</Button>
                    </Grid>
                  </Grid>
                    
                    {/* <Grid item xs={6} className={classes.debug}>
                      <Button >Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button>Submit</Button>
                    </Grid> */}
                </Grid>

              </form>

            </Paper>

          </Container>



        // <div>
        //     <div className="flex flex-col w-1/2 bg-green-100">
        //         <h1 className="col-span-2 self-center  pb-1">Welcome to your Profile!</h1>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle} >username:</label>
        //             {/* <label className={inputStyle}>{profile?.username}</label> */}
        //             <input className={inputStyle} onChange={handleUsernameChange} type="text" value={profile? profile.username : ""} />
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>first name:</label>
        //             <input className={inputStyle} onChange={handleFirstNameChange} type="text" value={profile? profile.firstName : ""} />                
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>last Name:</label>
        //             <input className={inputStyle} onChange={handleLastNameChange} type="text" value={profile? profile.lastName : ""} />                
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>joined:</label>
        //             <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.joined.toString() : ""} />                
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>profile picture</label>
        //             <input className={inputStyle} onChange={handleProfilePicChange} type="text" value={profile? profile.thumbNail : ""} />               
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>Time Zone:</label>
        //             {/* <input className={labelStyle} onChange={handleTimeZoneChange} type="text" value={profile? profile.timeZone : ""} />                </div> */}
        //             <select value={profile?.timeZone? profile.timeZone : "EST"}>
        //                 {TIMEZONES.map(x => (<option value={x}>{x}</option>))}
        //             </select>
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>invited:</label>
        //             <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.invited : ""} />                
        //         </div>
        //         <div className="flex border border-black pb-1">
        //             <label className={labelStyle}>attending:</label>
        //             <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.attending : ""} />                
        //         </div>
        //         <div className="flex border border-black">
        //             <label className={labelStyle}>default schedule:</label>
        //             <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.defaultSchedule.toString() : ""} />                
        //         </div>
        //         <div className="flex justify-between">
        //         <Button variant="contained" color="primary">Hello World</Button>
        //           {/* <button onClick={enterEditMode} className="border border-black rounded-md w-16 hover:bg-blue-300 bg-blue-100">Edit</button> */}
        //           {editMode? <button onClick={handleSubmit} className="border border-black rounded-md w-16 hover:bg-blue-300 bg-blue-100">Submit</button>: "" }
        //         </div>
        //     </div>
        // </div>
    )
}

export default Profile