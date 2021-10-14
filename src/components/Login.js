import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();
  const [user, setUser] = useState({name:"",password:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem('name', json.user.name);
      localStorage.setItem('email', json.user.email);
      history.push("/");
      props.showAlert('success','Logged in successfully.');

    } else {
      props.showAlert('danger','Invalid Credentials...!!!')
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
    <h2 className="mt-3 container">Login to continue to iNotebook.</h2>
      <form className="container mx-3 my-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            onChange={onChange}
            name="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            required 
            minLength={5}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
