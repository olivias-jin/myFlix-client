// import the PropTypes library
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The Movie Card function component
export const MovieCard = ({ movie  }) => {
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.image} className="movie-image" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
          
        </Link>
      </Card.Body>
    </Card>
  );
};

//  where define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired
};


