import { useState ,useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import { title } from "process";


export const MainView = () => {
  const [movie, setMovies] =useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] =useState(null);

  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  // const [user, setUser] =useState(storedUser? storedUser : null);
  // const [token, setToken] = useState(storedToken? storedToken: null);
  // const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
 
useEffect(() => {
  fetch("https://morning-taiga-69315-198698fb21c5.herokuapp.com/movies")
  .then((response) => response.json())
  .then((data)=> {
    const moviesFromApi = data.docs.map((doc) => {
      return {
        id:doc.key,
        title:doc.title,
        image:,
        author: doc.author_name?.[0]
      };
    });
    setMovies(moviesFromApi);
    });

}, []);


return(
  <Row>
{ !user ? (
  <>
  <LoginView onLoggedIn={(user) => setUser(user)}/> 
  or
  <SignupView/>
    </>
) : selectedMovie ?(
    <MovieView 
    movie={selectedMovie} 
    onBackClick={() => setSelectedMovie(null)}
    />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
      {movie.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onMoiveClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
    </>
  )}
  </Row>
);
};

<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

