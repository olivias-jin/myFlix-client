import React, { useState } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies, onUpdatedUserInfo, onDeleteUser, token }) => {
  const favoriteMovieList = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

  // Initialize state with user data
  const [username, setUsername] = useState(user.Username || "");
  const [email, setEmail] = useState(user.Email || "");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(user.Birthday || "");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!password) {
      alert("Please enter your password to update your profile");
      return;
    }

    const data = {
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday,
    };

    fetch(`https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Update successful!")
          return response.json();
        } else {
          alert("Update failed!");
        }
      })
      .then((data) => {
        onUpdatedUserInfo(data);
        setUsername(data.Username);
        setPassword(data.Password);
        setEmail(data.Email);
        setBirthday(data.Birthday);
        alert("Profile updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      fetch(`https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            alert("Deleted the User");
            onDeleteUser(user.id);
          } else {
            alert("An error occurred while trying to delete the user.");
          }
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          alert("An error occurred while trying to delete the user.");
        });
    }
  };

  const removeFav = async (movie) => {
    try {
      const movieId = movie.id;
      console.log("Removing movie with ID:", movieId); // Log the ID used in the request
      console.log("User's current favorite movies:", user.FavoriteMovies); // Log user's favorite movies

      const response = await fetch(
        `https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}/movies/${movie.title}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update the user's favorite movies in the state
        alert("Movie removed from favorites!");
        // You might need to call a function to update the user's favorite movies in the parent component.
        // Call a function to re-fetch or update the user's state if necessary.
        onUpdatedUserInfo({
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movie.id)
        });
      } else {
        const errorMessage = await response.text();
        alert("Failed to remove movie from favorites: " + errorMessage);
      }
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
      alert("An error occurred while removing the movie from favorites.");
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Card>
        <Col>
          <Card.Header>
            <h4>Account Information</h4>
            <div className="user-info">
              <p>Username: {user.Username}</p>
              <p>Email: {user.Email}</p>
            </div>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h4>Profile Update</h4>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="button-space">
                Update Profile
              </Button>
            </Form>

            <Button variant="danger" onClick={handleDelete} className="button-space-danger">
              Delete User
            </Button>
          </Card.Body>

          <Card.Body>
            <h4>Favorite Movies</h4>
            {favoriteMovieList.map((movie) => (
              <div key={movie.title} >
                <img src={movie.image} alt={movie.title} />
                <Link to={`/movies/${movie.id}`}>
                  <h4>{movie.title}</h4>
                </Link>
                <Button variant="secondary" onClick={() => removeFav(movie)} >
                  Remove from list
                </Button>
              </div>
            ))}
          </Card.Body>
        </Col>
      </Card>
    </Row>
  );
};