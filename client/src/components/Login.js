import React, { useState, useEffect } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [isLoggedIn, setLogged] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/login",
        credentials
      )
      .then(response => {
        console.log("response", response);
        const { data } = response;
        sessionStorage.setItem("token", data.payload);
        setLogged(true);
        props.history.push("/bubblepage");
      })
      .catch(err => {
        console.log("there was an error");
        console.log(err);
      })
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  },[]);


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <h2>{isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
