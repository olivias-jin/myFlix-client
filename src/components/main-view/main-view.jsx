import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
        id: 1, 
        title: "Forrest Gump",
        image:"https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX558_.jpg",
        director:"Robert Zemeckis"
     },
    { 
        id: 2, 
        title: "Spirited Away" ,
        image:"https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        director:"Hayao Miyazaki"
    },
    { 
        id: 3, 
        title: "Wall E" ,
        image:"https://raidofgame.com/uploads/posts/2020-01/1579978134_poster-wall-e.jpg",
        director:"Andrew Stanton"
    },
    { 
        id: 4, 
        title: "Toy Story" ,
        image:"https://image.tmdb.org/t/p/original/c527bh3QM4ItVT3ek5EI7GQOoDR.jpg",
        director:"John Lasseter"
    },
    { 
        id: 5, 
        title: "3 Idiots" ,
        image:"https://static.cinemagia.ro/img/db/movie/46/20/01/3-idiots-471949l.jpg",
        director:"Rajkumar Hirani"
    }
  ]);

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
