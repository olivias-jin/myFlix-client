<<<<<<< Updated upstream
import { useEffect, useState } from "react";
=======
import { useState ,useEffect } from "react";
>>>>>>> Stashed changes
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars");
  },[]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
}
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
