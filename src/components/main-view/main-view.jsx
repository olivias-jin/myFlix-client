import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
        id: 1, 
        title: "Forrest Gump",
        image:"https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i",
        director:"Robert Zemeckis"
     },
    { 
        id: 2, 
        title: "Spirited Away" ,
        image:"https://www.imdb.com/title/tt0245429/mediaviewer/rm4207852801/?ref_=tt_ov_i",
        director:"Hayao Miyazaki"
    },
    { 
        id: 3, 
        title: "Wall E" ,
        image:"https://www.imdb.com/title/tt0910970/mediaviewer/rm1659211008/?ref_=tt_ov_i",
        director:"Andrew Stanton"
    },
    { 
        id: 4, 
        title: "Toy Story" ,
        image:"https://www.imdb.com/title/tt0114709/mediaviewer/rm3813007616/?ref_=tt_ov_i",
        director:"John Lasseter"
    },
    { 
        id: 5, 
        title: "3 Idiots" ,
        image:"https://www.imdb.com/title/tt1187043/mediaviewer/rm2029391104/?ref_=tt_ov_i",
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
