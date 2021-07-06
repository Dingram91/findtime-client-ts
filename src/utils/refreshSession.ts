const doRefresh = (refreshToken: string) => {
  fetch("http://localhost:3000/api/user/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      refreshToken: refreshToken,
    },
  }).then();
};

export default doRefresh;
