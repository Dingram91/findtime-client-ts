import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const useProfile = (
  user: IUser,
  setUser: (user: IUser | undefined) => void
) => {
  const [profile, setProfile] = useState<ProfileInterface | undefined>({
    username: "",
    firstName: "",
    lastName: "",
    thumbNail: "",
    joined: new Date(),
    timeZone: "",
    attending: [],
    invited: [],
    defaultSchedule: [],
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if the users auth token is expired refresh it
    if (checkIfSessionExpired(user)) {
      refreshSession(user, setUser);
    }

    setTimeout(() => {
      fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: user.token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Unable to fetch profile data");
          }
          return response.json();
        })
        .then((data) => {
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
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, []);
  return { profile, setProfile, isPending, error };
};

const checkIfSessionExpired = (user: IUser) => {
  if (user.token && jwt.decode(user.token)) {
    const decoded = jwt.decode(user.token) as jwt.JwtPayload;
    if (decoded && decoded?.exp) {
      const expiration = decoded.exp;
      const now = new Date();
      return now.getTime() <= expiration * 1000;
    }
  }
  return false;
};

const refreshSession = (
  user: IUser,
  setUser: (user: IUser | undefined) => void
) => {
  console.log("Refreshing Session");
  fetch("http://localhost:3000/api/user/refresh", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      refreshToken: user.refresh,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setUser({
        token: data.authToken,
        refresh: data.refreshToken,
      });
    })
    .catch((error) => {
      console.log("Unable to refresh token");
      console.log(error.message);
    });
};

export default useProfile;
