// import "./App.css";
import LoginForm from "./components/LoginForm";
import { useContext, useState} from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Calendar from './components/Calendar';
import Logout from './components/Logout';
import Schedule from './components/Schedule';
import AppNavBar from './components/AppNavBar'
import AppDrawer from "./components/AppDrawer";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SignUp from "./components/SignUp";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
  )


function App() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [drawerState, setDrawerState] = useState(false);



  const drawerOpenCloseHook = () => {
    setDrawerState(!drawerState)
  }

  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <AppNavBar drawerOpenCloseHook={drawerOpenCloseHook} />
        {/* Side drawer for navigation */}
        <AppDrawer drawerState={drawerState} toggleDrawer={drawerOpenCloseHook} />
        {/* Routes for different pagers of the site */}
        <Switch>
          <Route exact path="/">
            <Schedule />
          </Route>
          <Route exact path="/register">
            <SignUp />
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
