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
    const [search, setSearch] = useState('');
    const [paginationSize, setPaginationSize] = useState(1);
    const [searchActive, setSearchActive] = useState(false);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        getMovies(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page_id}`);        
        window.scrollTo(0, 0)
        setLoading(false)
        setActivePage(page_id)
    }, [page_id])



    const getMovies = (path) => {
        axios.get(path)
            .then((res) => {
                const data = res.data.results;
                let random = Math.floor(Math.random() * data.length);
                setMovies(data)
                setMainMovieImage(data[random])
                setLoading(true)
                setPaginationSize(res.data.total_pages)
                console.log(res.data)
            })
    }

    const onPageChange = (page) => {
        if (!searchActive) {
            if (page === 1) {
                history.push(`/`)
            } else {
                history.push(`/page/${page}`)
            }
        } else {
            axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}&language=ru-RU&page=${page}`)
            .then((res) => {
                setMovies(res.data.results)
                setSearchActive(true)
                setActivePage(page)
            })
        }
    }

    const onInputChange = (e) => {
        if (e.key === 'Enter') {
            setLoading(false)
            if (e.target.value !== ''){
            axios.get(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=${API_KEY}&language=ru-RU&page=1`)
            .then((res) => {
                //history.push(`/search/${e.target.value}`)
                setPaginationSize(res.data.total_pages)
                setMovies(res.data.results)
                console.log(res.data)
                setSearchActive(true)
                setActivePage(1)
                setLoading(true)
            })
            } else {
                getMovies(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page_id}`);
                window.scrollTo(0, 0)
                setLoading(false)
                setActivePage(page_id)
            }
        } else {
            setSearchActive(false)
           setSearch(e.target.value) 
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
                <Input fluid placeholder='Search...' icon='search' value={search} onChange={onInputChange} onKeyDown={onInputChange} />
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
                {loading ? <Pagination
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    activePage={activePage}
                    totalPages={paginationSize}
                    onPageChange={(event, { activePage }) => onPageChange(activePage)}
                /> : null}</Segment></Segment>
        </Fragment>
    )
}

export default withRouter(Movies);