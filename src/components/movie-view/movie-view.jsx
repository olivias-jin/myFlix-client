import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);


  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);

  // Add or remove a favorite movie
  const addtoFavorite = () => {
    fetch(`https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removefromFavorite = () => {
    fetch(`https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>

      <img className="w-100" src={`/images/${movie.ImagePath}`} alt={movie.Title} />

      <div><span>Title: </span>
      <span>{movie.title}</span></div>

      <div><span>Description: </span>
      <span>{movie.description}</span></div>

      <div><span>Author: </span>
      <span>{movie.author}</span></div>

      <div>
        <Link to={'/'}>
          <button className="back-button">Back</button>
        </Link>
      </div>



      <div>{isFavorite ? (
        <Button onClick={removefromFavorite}>Remove from Favorites</Button>
      ) : (
        <Button onClick={addtoFavorite}>Add to Favorites</Button>
      )}
      </div>
    </div>
  );
};