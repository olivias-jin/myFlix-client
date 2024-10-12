// import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

import "./movie-card.scss";

// The Movie Card function component
export const MovieCard = ({ movie, onMoiveClick }) => {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={book.image}/>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.author}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    // <div
    // onClick={() => {
    //     onMoiveClick(movie);
    //   }}
    //   >
    //     {movie.title}
    //     </div>
    );
};

//  where define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};


