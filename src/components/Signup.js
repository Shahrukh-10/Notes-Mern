import React, { useState } from "react";
import { useHistory } from "react-router";

const Signup = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!matchPassword()) {
      props.showAlert("danger", "Password mismatch.");
    } else if (json.success && matchPassword()) {
      //redirect
      localStorage.setItem("token", json.authToken);
      history.push("/");
      props.showAlert("success", "Account created successfully");
    } else {
      props.showAlert("danger", "Invalid Details.");
    }
  };
  const matchPassword = () => {
    return credentials.password === credentials.cpassword;
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className="mt-3 container">Create an account to use iNotebook.</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            required
            minLength={3}
            onChange={onChange}
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            onChange={onChange}
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            id="password"
            required
            minLength={5}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            id="cpassword"
            required
            minLength={5}
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
