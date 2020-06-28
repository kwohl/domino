import React, { useState } from "react";
import useSimpleAuth from "./useSimpleAuth";
import { Form, Button } from "semantic-ui-react"

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login } = useSimpleAuth();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const customerCreds = {
      username: credentials.username,
      password: credentials.password,
    };

    login(customerCreds).then(() => props.history.push("/"));
  };

  return (
    <div className="pageContent" id="login">
      <h1 style={{ width: "1000px" }} className="page-header">Log In to Domino!</h1>
      <Form style={{ width: "600px" }} onSubmit={handleLogin}>
        <Form.Field>
          <label htmlFor="username"><span className="form-label"> Username </span></label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            placeholder="Username"
            required=""
            autoFocus=""
            value={credentials.username}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password"><span className="form-label"> Password </span></label>
          <input
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
            autoFocus=""
            value={credentials.password}
          />
        </Form.Field>
        <Form.Field>
          <Button 
          style={{'background-color': "#DB5878", color: 'white'}}
          type="submit">Login</Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default Login;