import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormLabel from "react-bootstrap";
import FormGroup from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, favoriteMovieList, removeFav, onUpdatedUserInfo, onDeleteUser, token }) => {


    const favoriteMovieList = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

    
    // Updated User Info
    const [username, setUsername] = useState(user?.Username || "");
    const [password, setPassword] = useState(user?.password || "");
    const [email, setEmail] = useState(user?.email || "");
    const [birthday, setBirthday] = useState(user?.birthday || "01/01/0001");

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday
        };

        onUpdatedUserInfo(updatedData);
    };

    // Deregister
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            fetch(`https://morning-taiga-69315-198698fb21c5.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }).then(response => {
                if (response.ok) {
                    alert("Deleted the User");
                    onDeleteUser(user.id);
                } else {
                    alert("An error occurred while trying to delete the user.");
                }
            });
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Card>
                <Col>
                    <Card.Header>
                        <div className="user-info">
                            <h4>{user?.Username}</h4>
                            <p>{user?.Email}</p>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h4>Profile update</h4>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                            <Button variant="primary" type="submit">
                                Update Profile
                            </Button>
                        </Form>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete User
                        </Button>
                    </Card.Body>

                    <Card.Body>
                        <h4>Favorite Movies</h4>
                        {favoriteMovieList?.map((movie) => (
                            <div key={movie._id}>
                                <img src={movie.ImagePath} alt={movie.Title} />
                                <Link to={`/movies/${movie._id}`}>
                                    <h4>{movie.Title}</h4>
                                </Link>
                                <Button variant="secondary" onClick={() => removeFav(movie._id)}>
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