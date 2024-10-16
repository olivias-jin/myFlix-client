import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { title } from "process";
import { ProfileView } from "../profile-view/profile-view";


export const MainView = () => {
  // const [movie, setMovies] = useState([]);
  // const [user, setUser] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    fetch("https://morning-taiga-69315-198698fb21c5.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: 'https://via.placeholder.com/150',
            author: doc.Director?.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);


  // adding fav movies
  const addToFavorite = async (movie) => {
    try {
      const response = await fetch(
        `https://morning-taiga-69315-198698fb21c5.herokuapp.com/users/${user.Username}/movies/${movie.title}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.ok) {
        const updatedUser = {
          ...user,
          FavoriteMovies: [...user.FavoriteMovies, movie.id]
        }
        console.log(updatedUser)
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser))
        alert("Movie added to favorites!");
      } else {
        alert("Failed to add movie to favorites.");
      }
    } catch (erro) {
      console.error("Error adding movie to favorites:", error);
      alert("An error occurred while adding the movie to favorites.");
    }
  }

  //remove fav movies
  const removeFav = async (movie) => {
    try {
      const response = await fetch(
        `https://morning-taiga-69315-198698fb21c5.herokuapp.com/users/${user.Username}/movies/${movie.title}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movie.id)
        }
        setUser(updaedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser))
        alert("Movie removed from favorites!");
      } else {
        alert("Failed to remove movie from favorites.");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      alert("An error occurred while adding the movie to favorites.")
    }
  }


const onLoggedOut = () => {
  localStorage.clear();
  setUser(null);
  setToken(null);
}

return (
  <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={onLoggedOut} />

    <Row className="justify-content-md-center">
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
                  <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user))
                      localStorage.setItem("token", token)
                    }} />
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
                  <ProfileView removeFav={removeFav} movies={movies} user={user}

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
                  <MovieView movies={movies} />
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
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard handleAddToFavorite={addToFavorite} movie={movie} />
                    </Col>
                  ))}
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
