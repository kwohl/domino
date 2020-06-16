import React, { useState } from "react";
import useSimpleAuth from "./useSimpleAuth";

const Register = (props) => {
  const [credentials, setCredentials] = useState({ email: "", username: "", password: "", });
  const { register } = useSimpleAuth();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
    };

    register(newUser).then(() => props.history.push("/"));
  };

  return (
    <div className="pageContent" id="register">
      <form onSubmit={handleRegister}>
        <h1>
          Register to get started with Domino!
        </h1>
        <fieldset>
          <label htmlFor="email"> Email </label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="Email Address"
            required=""
            autoFocus=""
          />
        </fieldset>
        <fieldset>
          <label htmlFor="username"> Username </label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            placeholder="Username"
            required=""
            autoFocus=""
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
            autoFocus=""
          />
        </fieldset>
        <fieldset>
          <button type="submit">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;