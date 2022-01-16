import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "cd5fc04ce84cbd5a92b164fbd36e45af";
export default function Home() {
  const [movies, setMovies] = useState();
  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Seo title="Home"></Seo>
      {!movies && <h1>왜안나왂ㄲㄲㄲ</h1>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
