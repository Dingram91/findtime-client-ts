import React, { useContext, useEffect } from "react";
import {UserContext} from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';

function LoginForm() {
  const [value, setValue] = React.useState({ email: "Jsnow@gmail.com", password: "I_like_snow" });
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, password: event.target.value });
  };

  const handleLoginWithHistory = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // JSON data from response
        console.log(JSON.stringify(data));

        if(!data.error) {
          setUser!({username: data.username, token: data.authToken});
          console.log("Login Success");
          history.push("/");
        } else {
          alert(data.error);
        }

      }).catch((e) => {alert(e.message)});

  }

  return (
  <div className="min-h-screen bg-blue-100 flex flex-col justify-center items-center">
    <div className="flex flex-col border-black">
      <label className="p-1">Email address</label>
      <input className="p-1" type="text" value={value.email} onChange={handleEmailChange}/>
      <label className="p-1">password</label>
      <input className="p-1" type="text" value={value.password} onChange={handlePasswordChange}/>
      <br />
      <div className="flex justify-end">
        <Link to="/register" className="bg-blue-900 hover:bg-blue-700 w-1/3 self-center text-blue-50 mx-1">Register</Link>
        {/* <Link to={handleLogin} className="bg-blue-900 hover:bg-blue-700 w-1/3 self-center text-blue-50 mx-1" >Login</Link> */}

        <a className="bg-blue-900 hover:bg-blue-700 w-1/3 self-center text-blue-50 mx-1" onClick={handleLoginWithHistory} >Login</a>

      </div>
    </div>
  </div>

  
  );
}
export default LoginForm;
