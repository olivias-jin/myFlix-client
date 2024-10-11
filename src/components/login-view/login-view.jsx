import React, {useState} from "react";

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