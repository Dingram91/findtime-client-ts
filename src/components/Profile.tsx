import { useEffect, useState, ReactElement } from 'react';

type props = {
    user: IUser,
}

function Profile(props: props): ReactElement {

    const [profile, setProfile] = useState<ProfileInterface | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: props.user.token,
          },
        }).then((response) => response.json())
        .then((data) => {
          // JSON data from response
          console.log(JSON.stringify(data));
  
          if(!data.error) {
            setProfile({
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                joined: data.joined,
                thumbNail: data.thumbNail,
                timeZone: data.timeZone,
                invited: data.invited,
                attending: data.attending,
                defaultSchedule: data.defaultSchedule,
            });
          } else {
            alert(data.error);
          }
  
        }).catch((e) => {alert(e.message)});

    }, [props.user.token]);

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
      const handleTimeZoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // if(profile) setProfile({ ...profile, timeZone: event.target.value });
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
        <div>
            <div className="flex flex-col w-1/2 bg-green-100">
                <h1 className="col-span-2 self-center  pb-1">Welcome to your Profile!</h1>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle} >username:</label>
                    {/* <label className={inputStyle}>{profile?.username}</label> */}
                    <input className={inputStyle} onChange={handleUsernameChange} type="text" value={profile? profile.username : ""} />
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>first name:</label>
                    <input className={inputStyle} onChange={handleFirstNameChange} type="text" value={profile? profile.firstName : ""} />                
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>last Name:</label>
                    <input className={inputStyle} onChange={handleLastNameChange} type="text" value={profile? profile.lastName : ""} />                
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>joined:</label>
                    <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.joined.toString() : ""} />                
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>profile picture</label>
                    <input className={inputStyle} onChange={handleProfilePicChange} type="text" value={profile? profile.thumbNail : ""} />               
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>Time Zone:</label>
                    {/* <input className={labelStyle} onChange={handleTimeZoneChange} type="text" value={profile? profile.timeZone : ""} />                </div> */}
                    <select value={profile?.timeZone? profile.timeZone : "EST"}>
                        {TIMEZONES.map(x => (<option value={x}>{x}</option>))}
                    </select>
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>invited:</label>
                    <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.invited : ""} />                
                </div>
                <div className="flex border border-black pb-1">
                    <label className={labelStyle}>attending:</label>
                    <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.attending : ""} />                
                </div>
                <div className="flex border border-black">
                    <label className={labelStyle}>default schedule:</label>
                    <input className={inputStyleDisabled} readOnly type="text" value={profile? profile.defaultSchedule.toString() : ""} />                
                </div>
                <div className="flex justify-between">
                  <button onClick={enterEditMode} className="border border-black rounded-md w-16 hover:bg-blue-300 bg-blue-100">Edit</button>
                  {editMode? <button onClick={handleSubmit} className="border border-black rounded-md w-16 hover:bg-blue-300 bg-blue-100">Submit</button>: "" }
                </div>
            </div>
        </div>
    )
}

export default Profile