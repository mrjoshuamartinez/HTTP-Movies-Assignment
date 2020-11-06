import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  console.log("Params ID: ", params);
  console.log("History: ", history);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log("Delete request: ",res);
        history.push("/");
      })
      .catch(err => {
        console.log("Delete Movie Error: ", err);
      })
  }

  const updateMovie = () => {
    history.push(`/update-movie/${params.id}`);
  }
  
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="update-wrapper">
        <Button style={{ width: '150px', margin: '10px', marginLeft: '0px' }} onClick={saveMovie}>
          Save
        </Button>
        <Button style={{ width: '150px', margin: '10px', marginLeft: '0px' }} onClick={updateMovie}>
          Update Movie
        </Button>
        <Button style={{ width: '150px', margin: '10px', marginLeft: '0px' }} onClick={deleteMovie}>
          Delete Movie
        </Button>
      </div>
    </div>
  );
}

export default Movie;
