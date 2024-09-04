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