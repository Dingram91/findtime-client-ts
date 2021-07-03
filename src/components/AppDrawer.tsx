import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { ReactElement, useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

interface Props {
    drawerState: boolean;
    toggleDrawer: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      borderRadius:"5px",
      '&:hover': {
        backgroundColor: '#c8d5e8'
      }
    },
  })
  )

function AppDrawer({drawerState, toggleDrawer}: Props): ReactElement {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    console.log(location.pathname)

    const loginLogout = user? <ListItemText className={classes.link} primary="Logout" onClick={() => {toggleDrawer(); history.push('/logout')}} /> : <ListItemText className={classes.link} primary="Login" onClick={() => {toggleDrawer(); history.push('/login')}} />

    return (
      <Drawer open={drawerState} onClose={toggleDrawer} >
        <List >
          <ListItem selected={location.pathname==='/'} >
            <ListItemText className={classes.link} primary="Home" onClick={() => {toggleDrawer(); history.push('/')}} />
          </ListItem>
          <ListItem selected={location.pathname==='/login' || location.pathname==='/logout'}>
            {loginLogout}
          </ListItem>
          <ListItem selected={location.pathname==='/profile'}>
            <ListItemText className={classes.link} primary="Profile" onClick={() => {toggleDrawer(); history.push('/profile')}} />
          </ListItem>
          <ListItem selected={location.pathname==='/calendar'}>
            <ListItemText className={classes.link} primary="Calendar" onClick={() => {toggleDrawer(); history.push('/calendar')}} />
          </ListItem>
        </List>
      </Drawer>
    )
}

export default AppDrawer
