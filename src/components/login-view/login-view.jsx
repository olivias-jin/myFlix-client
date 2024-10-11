import React, {useState} from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data ={
            Username : username,
            Password : password,
        };

        fetch("https://morning-taiga-69315-198698fb21c5.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if (response.ok) {
              alert("Signup successful");
              return response.json;
            } else {
              alert("Signup failed");
            }
          }).then((data) => {
            onLoggedIn(data.user, data.token)
          });
        };



    return (
        <Form onSubmit={handleSubmit}> 
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
        </Form>
    );
};

<Col md={5}>
<LoginView onLoggedIn={(user) => setUser(user)} />
or
<SignupView />
</Col>