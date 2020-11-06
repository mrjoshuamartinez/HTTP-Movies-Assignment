import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div>
      <Button style={{ marginRight: '5px', marginLeft: '5px' }}>
        <Link style={{color: 'white', textDecorationLine: 'none'}} to="/">Home</Link>
      </Button>
      <Button style={{ marginRight: '5px', marginLeft: '5px' }}>
        <Link style={{color: 'white', textDecorationLine: 'none'}} to="add-movie">Add Movie</Link>
      </Button>
      </div>
    </div>
  );
}

export default SavedList;
