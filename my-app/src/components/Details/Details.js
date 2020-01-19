import React, { useState, Fragmen, useEffect, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import { Segment, Container, Button } from 'semantic-ui-react';
import MainImage from '../MainImage/MainImage';
import axios from 'axios';
const Details = ({ movie_id }) => {
    const API_KEY = '2af995031242e9bf96fb7bce86c8f7e9';
    const API_URL = 'https://api.themoviedb.org/3/';
    const IMAGE_URL = 'http://image.tmdb.org/t/p/';
    const IMAGE_SIZE = 'w1280';
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState();

    
    useEffect(() => {
        axios.get(`${API_URL}movie/${movie_id}?api_key=${API_KEY}&language=ru-RU`)
        .then((res) => {
            setMovie(res.data)
            setLoading(true)
        }) 
        axios.get(`${API_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=ru-RU`)
        .then((res) => {
            console.log(res.data)
        })           
    },[movie_id])


    return (
        <Fragment>
            {loading ?
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE}${movie.belongs_to_collection!==null ? movie.belongs_to_collection.backdrop_path : movie.backdrop_path }`}
                    title={movie.title}
                    text={movie.overview}
                /> : <Segment textAlign='center'><Spinner /></Segment>}
                <Container>
                    <Button color='instagram'>Toggle actor view</Button>
                </Container>
        </Fragment>
    )
}

export default Details;