import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import Spinner from '../Spinner/Spinner';
import { Grid, Segment, Button, Image, Divider, Header, Container, Pagination } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import MainImage from '../MainImage/MainImage';
const Movies = ({ history, page_id }) => {
    const API_KEY = '2af995031242e9bf96fb7bce86c8f7e9';
    const API_URL = 'https://api.themoviedb.org/3';
    const IMAGE_URL = 'http://image.tmdb.org/t/p/';
    const IMAGE_SIZE = 'w1280';
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [path, setPath] = useState(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`);

    useEffect(() => {
        getMovies(path);        
    }, [path])

    useEffect(() => {
        setPath(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page_id}`)
        setLoading(false)
    }, [page_id])


    const getMovies = (path) => {
        axios.get(path)
            .then((res) => {
                let random = Math.floor(Math.random() * 19);
                const data = res.data.results;
                setMovies(data)
                setMainMovieImage(data[random])
                setLoading(true)
            })
    }

        
    const onPageChange = (page) => {
        if (page === 1) {
            history.push(`/`)
        } else {
            history.push(`/page/${page}`)
        }
    }

    return (
        <Fragment>
            {loading ?
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.title}
                    text={MainMovieImage.overview}
                /> : <Segment textAlign='center'><Spinner /></Segment>}
                <Divider hidden />
                <Header as='h2' textAlign='center'>Movies by lates</Header>
                <Divider />
                {loading ? <Segment><Grid columns={5}>
                    <Grid.Row>
                        {movies.map((item, id) => (
                            <Grid.Column key={id} >
                                <Link to={`/movie/${item.id}`}><Image src={`${IMAGE_URL}w500${item.poster_path}`} id='box'></Image></Link>
                            <Divider hidden></Divider></Grid.Column>
                            
                        ))}
                    </Grid.Row>
                </Grid></Segment> : <Segment textAlign='center'><Spinner/></Segment>}
                <Divider hidden></Divider>
                <Segment textAlign='center' basic>
                <Pagination
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    activePage={page_id}
                    totalPages={500}
                    onPageChange={(event, { activePage }) => onPageChange(activePage)}
                /></Segment>
        </Fragment>
    )
}

export default withRouter(Movies);