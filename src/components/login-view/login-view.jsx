import React, { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";
import { Link } from "react-router-dom";


export const LoginView = ({ onLoggedIn }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflix-client-oj-3c90e41c0141.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("LogIn successful");
          return response.json();
        } else {
          alert("LogIn failed");
        }
      }).then((data) => {
        onLoggedIn(data.user, data.token)
      });
  };



  return (

    <div className="login-view">
      <Form onSubmit={handleSubmit}>
        <h3>Welcome To Movie APP!</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <FormGroup controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="signup-text">
          New to Movie App? <Link to="/signup" className="signup-link">Sign up Now</Link>
        </p>



      </Form>
    </div>
  );
};