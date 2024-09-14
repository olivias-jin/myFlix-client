import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] =useState(null);

useEffect(() => {
  fetch("https://openlibrary.org/search.json?q=star+wars")
  .then((Response) => Response.json())
  .then((data)=> {
    const moviesFromApi = data.docs.map((doc) => {
      return {
        id : doc.key,
        title: doc.title,
        image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
        author: doc.author_name?.[0]
      };
    });

   setMovies(moviesFromApi);
    });
}, []);

if (!user) {
  return<LoginView/>;
}

  if (selectedMovie) {
    return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    );
  }


  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMoiveClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};


// export const MainView = () => {
//     return (
//       <div>
//         <div>Eloquent JavaScript</div>
//         <div>Mastering JavaScript Functional Programming</div>
//         <div>JavaScript: The Good Parts</div>
//         <div>JavaScript: The Definitive Guide</div>
//         <div>The Road to React</div>
//       </div>
//     );
//   }
