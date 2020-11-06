import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from 'reactstrap';

export default function AddMovie(props) {
    const history = useHistory();
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: "",
        stars: [""]
    })
    
    const handleChange = e => {
        e.persist();
        setMovie({...movie,
            [e.target.name]: e.target.value})
    }
    const submit = e => {
        e.preventDefault();
        setMovie({
            title: '',
            director: '',
            metascore: "",
            stars: ['']
        })
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                console.log("Post Request: ", res);
                props.setMovieList(res.data);
                history.push("/");
            })
            .catch(err => console.log(err))
    }
return(
    <div className="save-wrapper">
        <Form onSubmit={ submit } className="update-wrapper">
            <Input
                type="text"
                name="title"
                placeholder="Update Title"
                value={ movie.title }
                onChange={ handleChange }
                style={{ color: '#000000', marginBottom: '10px', marginTop: '10px' }}
            />
            <Input
                type="text"
                name="director"
                value={ movie.director }
                placeholder="Update Director"
                onChange={ handleChange }
                style={{ fontColor: '#000000', marginBottom: '10px', marginTop: '10px' }}
            />
            <Input
                type="text"
                name="metascore"
                value={ movie.metascore }
                placeholder="Update Score"
                onChange={ handleChange }
                style={{ color: '#000000', marginBottom: '10px', marginTop: '10px' }}
                />
            <Input
                type="text"
                name="stars"
                value={ movie.stars }
                placeholder="Add New Actor"
                onChange={ handleChange }
                style={{ color: '#000000', marginBottom: '25px', marginTop: '10px' }}
                />
            <Button style={{ width: '150px' }}>Add Movie</Button>
        </Form>
    </div>
)
}