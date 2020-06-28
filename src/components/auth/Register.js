import React, { useState } from "react";
import useSimpleAuth from "./useSimpleAuth";
import { Form, Button } from "semantic-ui-react";

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
      <h1 className="page-header">Get started with Domino!</h1>
      <Form style={{ width: "600px" }} onSubmit={handleRegister}>
        <Form.Field>
          <label htmlFor="email"><span className="form-label"> Email </span></label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="Email Address"
            required=""
            autoFocus=""
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="username"><span className="form-label"> Username </span></label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            placeholder="Username"
            required=""
            autoFocus=""
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
          />
        </Form.Field>
        <Form.Field>
          <Button style={{'background-color': "#DB5878", color: 'white'}} type="submit">Register</Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default Register;