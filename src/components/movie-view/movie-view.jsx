import { Cursor } from "mongoose";
import "./movie-view.scss";

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
        <button 
        onClick ={onBackClick} 
        className="back-button"
        style={{Cursor: "pointer"}}
          >
          Back
        </button>
      </div>
    );
  };