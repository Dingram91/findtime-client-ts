// import "./App.css";
import LoginForm from "./pages/Login";
import { useContext, useState} from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Calendar from './components/Calendar';
import Logout from './components/Logout';
import Schedule from './components/Schedule';
import AppNavBar from './components/AppNavBar'
import AppDrawer from "./components/AppDrawer";
import { createStyles, makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from "./pages/SignUp";
import { CssBaseline } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
  })
  )


function App() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [drawerState, setDrawerState] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: { 
      type: darkMode? "dark": 'light'
    }
  });
  

  const drawerOpenCloseHook = () => {
    setDrawerState(!drawerState)
  }

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="App" >
        <ThemeProvider theme={theme}>
          <CssBaseline />
        {/* <NavBar /> */}
        <AppNavBar drawerOpenCloseHook={drawerOpenCloseHook} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
            {user?.token? (<Profile /> ): (<Redirect to="/login" />)} 
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
