import { ReactElement, useContext } from 'react';
import {UserContext} from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';


function Logout(): ReactElement {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    
    
    const doLogout = () => {
      fetch("http://localhost:3000/api/user/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken: user!.token!,
        },
        body: JSON.stringify({
          authToken: user?.token
        }),
      }).then((response) => response.json())
      .then((data) => {
        // JSON data from response
        console.log(JSON.stringify(data));
        
        if(!data.error) {
          setUser!(undefined);
          console.log("Logout Success");
          history.push("/");
        } else {
          alert(data.error);
          // return "Logout Failed"
        }
      })
      
      // return "Logout Success"
    }
    
    if (user) {
      doLogout();
    }


    return (
        <div>
            Logged Out
        </div>
    )
}

export default Logout