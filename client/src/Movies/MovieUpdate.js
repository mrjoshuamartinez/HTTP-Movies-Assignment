import axios from "axios";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import { Button, Form, Input, Label } from 'reactstrap';


export default function MovieUpdate(props) {
    console.log('Props:', props)
    const params = useParams();
    const {push} = useHistory();
    //console.log(params);
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: "",
        stars: ['']
    })

    const handleChange = (e) => {
        e.persist();
        setMovie({...movie,
            [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault();
        setMovie({
            title: '',
            director: '',
            metascore: "",
            stars: ['']
        });

        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(res => {
                console.log("update movie res: ", res);
                props.setMovieList(res.data);
                push("/");
            })
            .catch(err=>{
                console.log(err);
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                console.log("Movie Information: ", res);
                setMovie(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.id]);
    
    return (
        <div className="save-wrapper">
            <div>
                <Form onSubmit={submit} className="update-wrapper">
                    <Label>Title:</Label>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Update Title"
                        value={movie.title}
                        onChange={handleChange}
                        style={{marginTop: '5px', marginBottom: '5px'}}
                    />
                    <Label>Director:</Label>
                    <Input
                        type="text"
                        name="director"
                        value={movie.director}
                        placeholder="Update Director"
                        onChange={handleChange}
                        style={{marginTop: '5px', marginBottom: '5px'}}
                    />
                    <Label>MetaScore:</Label>
                    <Input
                        type="text"
                        name="metascore"
                        value={movie.metascore}
                        placeholder="Update Score"
                        style={{marginTop: '5px', marginBottom: '5px'}}
                    />
                    <Label>Movie Stars:</Label>
                    <Input
                        type="text"
                        name="stars"
                        value={movie.stars}
                        placeholder="Add New Actor"
                        onChange={handleChange}
                        style={{marginTop: '5px', marginBottom: '25px'}}
                    />
                    <Button style={{width: '200px'}}>Update Movie</Button>
                </Form>
            </div>
        </div>
    )
}