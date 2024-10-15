import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movies.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{movies.author}</span>
      </div>
      <Link to={'/'}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};