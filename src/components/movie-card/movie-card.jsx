// import the PropTypes library
import PropTypes from "prop-types";

// The Movie Card function component
export const MovieCard = ({ movie, onMoiveClick }) => {
    return (
    <div
    onClick={() => {
        onMoiveClick(movie);
      }}
      >
        {movie.title}
        </div>
    );
};

//  where define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};


