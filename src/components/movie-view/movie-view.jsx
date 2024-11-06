import React, { useState, useEffect } from "react";
import { useParams  } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Form, InputGroup, Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const movie = movies.find((b) => b.id === movieId);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      setIsFavorite(user.FavoriteMovies.includes(movieId));
    }
  }, [movieId, user]);

  const addToFavorite = async (movie) => {
    try {
      const response = await fetch(
        `https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}/movies/${movie.title}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedUser = {
          ...user,
          FavoriteMovies: [...user.FavoriteMovies, movie.id],
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Movie added to favorites!");
      } else {
        const errorMessage = await response.text(); // Read the response text for error details
        console.error("Add to favorites failed:", errorMessage);
        alert("Failed to add movie to favorites. " + errorMessage);
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      alert("An error occurred while adding the movie to favorites.");
    }
  };

  // Filter movies based on search term
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-view">
      {/* Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for movies.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary">Search</Button>
      </InputGroup>

      {/* Display Current Movie Details */}
      <img className="w-100" src={movie.image} alt={movie.title} />
      <div className="movie-info">
        <div>
          <h5><span>Title: </span>
            <span>{movie.title}</span></h5>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Author: </span>
          <span>{movie.author}</span>
        </div>
        <div className="click">
          <Link to={'/'}>
            <button className="back-button button-space">Back</button>
          </Link>

          {/* Conditional rendering of the Add to Favorites button */}
          {!isFavorite && (
            <Button className="button-space" onClick={() => addToFavorite(movie)}>
              Add to Favorites
            </Button>
          )}
        </div>
      </div>

      {/* Display Search Results */}
      {searchTerm && (
        <div className="search-results mt-4">
          <h5>Search Results:</h5>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((m) => (
              <Card key={m.id} className="mb-2">
                <Card.Body>
                  <Card.Title>{m.title}</Card.Title>
                  <Button
                    variant="link"
                    onClick={() => navigate(`/movies/${m.id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};