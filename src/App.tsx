// import "./App.css";
import LoginForm from "./components/LoginForm";
import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Calendar from './components/Calendar';

function App() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
        <Route exact path="/">
            <h1>Home Page</h1>
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/profile">
            {(!user || user.username==="") ? <Redirect to="/login" /> : <Profile user={user} />} 
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
