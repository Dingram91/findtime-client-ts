import React, { ReactElement, useContext } from "react";
import {UserContext} from '../contexts/UserContext';
import {useHistory } from 'react-router-dom';
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, makeStyles, TextField } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import AvTimerTwoToneIcon from '@material-ui/icons/AvTimerTwoTone';

const useStyles = makeStyles((theme) => ({
  paper: {
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm() : ReactElement {
  const classes = useStyles();
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

    fetch("http://192.168.1.101:3000/api/user/login", {
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

        if(!data.error) {
          console.log("Refresh token = " + data.refreshToken);
          console.log("user token " + data.authToken)
          setUser!({token: data.authToken, refresh: data.refreshToken});
          console.log("Login Success");
          history.push("/");
        } else {
          alert(data.error);
        }

      }).catch((e) => {alert(e.message)});

  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AvTimerTwoToneIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleLoginWithHistory} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={value.email? null : "Email Address"}
          value={value.email}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleEmailChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={value.password? null : "password"}
          value={value.password}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handlePasswordChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={() => history.push('/register')} >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>

  
  );
}
export default LoginForm;
