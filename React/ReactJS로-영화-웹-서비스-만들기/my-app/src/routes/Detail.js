import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      <h1>Detail</h1>
      <h2>{movie.title}</h2>
    </div>
  );
}

export default Detail;
