export const MovieView = ({ movie, onBackClick}) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Author: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <button onClick ={onBackClick}>Back</button>
      </div>
    );
  };


  MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }).isRequired,
      ImagePath: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };