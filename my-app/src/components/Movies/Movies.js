import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import Spinner from '../Spinner/Spinner';
import { Grid, Segment, Button, Image, Divider, Header, Container, Pagination, Input, Search } from 'semantic-ui-react';
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

    useEffect(() => {
        getMovies(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page_id}`);        
        window.scrollTo(0, 0)
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
                console.log(data,'data')
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
                <Segment basic>
                <Header as='h2' textAlign='center'>Movies by lates</Header>
                <Divider />
                {loading ? <Segment basic><Grid columns={5}>
                    <Grid.Row>
                        {movies.map((item, id) => (
                            <Grid.Column key={id} >
                                {item.poster_path !== undefined || item.poster_path !== null ? <Link to={`/movie/${item.id}`}><Image src={`${IMAGE_URL}w500${item.poster_path}`} id='box'></Image></Link> : null}
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
                /></Segment></Segment>
        </Fragment>
    )
}

export default withRouter(Movies);