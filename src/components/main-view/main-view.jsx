import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProfileView } from "../profile-view/profile-view";
import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);


  // Search bar
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch movies
  useEffect(() => {
    fetch("https://myflix-client-oj-3c90e41c0141.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            image: doc.ImagePath,
            author: doc.Director?.Name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  // Sync with localStorage on mount to ensure latest user info is loaded
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const onLoggedOut = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  // Search bar handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  //  Filter  movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm));

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />

      <Row className="justify-content-md-center mt-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path={"/users/:userId"}
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onUpdatedUserInfo={(updatedUser) => {
                        setUser(updatedUser);
                        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
                      }}
                      onDeleteUser={onLoggedOut}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView setUser={setUser} token={token} user={user} movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {/* Search Bar */}
                    <Row className="justify-content-center">
                      <Col xs={8} sm={6} md={4}>  {/* 반응형으로 크기 조정 */}
                        <InputGroup className="mb-4">
                          <Form.Control
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <Button variant="outline-secondary">Search</Button>
                        </InputGroup>
                      </Col>
                    </Row>
                    {/* Display Movies */}
                    <Row>
                      {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      ) : (
                        <Col>No movies found.</Col>
                      )}
                    </Row>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
