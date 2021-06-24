// import "./App.css";
import LoginForm from "./components/LoginForm";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Calendar from './components/Calendar';
import Logout from './components/Logout';
import Schedule from './components/Schedule';


function App() {
  const { user } = useContext(UserContext);

  console.log("Render App")
  

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
        <Route exact path="/">
            <h1>Home Page</h1>
            <Schedule schedule={[{start: new Date(), end: new Date('6/23/21')}]}/>
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/profile">
            {user?.token? (<Profile user={user}/> ): (<Redirect to="/login" />)} 
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
