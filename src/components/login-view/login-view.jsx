import passport from "passport";
import React, {useState} from "react";

export const LoginView = (onLoggedIn) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data ={
            Username : username,
            Password : password,
        };

        fetch("SIGNUP_URL", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if (response.ok) {
              alert("Signup successful");
              window.location.reload();
            } else {
              alert("Signup failed");
            }
          });
        };



    return (
        <form onSubmit={handleSubmit}> 
            <label>
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                Password:
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                 />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};