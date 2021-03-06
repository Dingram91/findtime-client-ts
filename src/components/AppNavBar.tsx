import React, { useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useHistory } from 'react-router-dom'
import { FormControlLabel, Switch } from '@material-ui/core'
import useProfile from '../utils/CustomHooks/useProfile'
import AvatarImage from './AvatarImage'
import { UserContext } from '../contexts/UserContext'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            textAlign: 'center',
            flexGrow: 1,
        },
    })
)
interface Props {
    drawerOpenCloseHook: () => void
    darkMode: boolean
    toggleDarkMode: () => void
}

export default function AppNavBar({
    drawerOpenCloseHook: toggleDrawer,
    darkMode,
    toggleDarkMode,
}: Props) {
    const classes = useStyles()
    const [auth] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const history = useHistory()
    const { profile } = useProfile()
    const { nameAndImage } = useContext(UserContext)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        FindTimeApp
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {nameAndImage?.avatarImage ? (
                                    <AvatarImage
                                        imageName={nameAndImage.avatarImage}
                                    />
                                ) : (
                                    <AccountCircle />
                                )}
                                {/* <AccountCircle /> */}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => history.push('/profile')}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={darkMode}
                                                onChange={toggleDarkMode}
                                                name="darkMode"
                                                color="primary"
                                            />
                                        }
                                        label="Dark Mode"
                                    />
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
