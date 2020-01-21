import React, { useState, Fragmen, useEffect, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import { Segment, Container, Button, Table, Divider, Label, Image, Grid, Header, Card } from 'semantic-ui-react';
import MainImage from '../MainImage/MainImage';
import axios from 'axios';
const Details = ({ movie_id }) => {
    const API_KEY = '2af995031242e9bf96fb7bce86c8f7e9';
    const API_URL = 'https://api.themoviedb.org/3/';
    const IMAGE_URL = 'http://image.tmdb.org/t/p/';
    const IMAGE_SIZE1 = 'w200';
    const IMAGE_SIZE2 = 'w1280';
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState();
    const [show, setShow] = useState(false);
    const [crew, setCrew] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${API_URL}movie/${movie_id}?api_key=${API_KEY}&language=ru-RU`)
            .then((res) => {
                setMovie(res.data)
                setLoading(true)
                console.log(res.data,'res')
            })
        axios.get(`${API_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=ru-RU`)
            .then((res) => {
                setCrew(res.data.cast)
                console.log(res.data)
            })
        
    }, [movie_id])

    const onToggleActorView = () => {
        setShow(!show)
    }
         

    return (
        <Fragment>
            {loading ?
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE2}${movie.belongs_to_collection !== null ? movie.belongs_to_collection.backdrop_path : movie.backdrop_path}`}
                    title={movie.title}
                    text={movie.overview}
                /> : <Segment textAlign='center'><Spinner /></Segment>}
            {loading ? <Container fluid>
            <Divider hidden/>
                <Segment basic padded='very'>
                    <Button color='grey' floated='right'>Add to Favourite</Button>
                    <Table style={{ marginTop: 50}} attached='top' celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Runtime</Table.HeaderCell>
                                <Table.HeaderCell>Vote count</Table.HeaderCell>
                                <Table.HeaderCell>Release date</Table.HeaderCell>
                                <Table.HeaderCell>Vote average</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row> 
                                <Label color='red' ribbon size='mini'><Table.Cell>{movie.original_title}</Table.Cell></Label>
                                <Table.Cell>{movie.runtime}</Table.Cell>
                                <Table.Cell>{movie.vote_count}</Table.Cell>
                                <Table.Cell>{movie.release_date}</Table.Cell>
                                <Table.Cell>{movie.vote_average}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    <Table attached celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Revenue</Table.HeaderCell>
                                <Table.HeaderCell>Popularity</Table.HeaderCell>
                                <Table.HeaderCell>Budget</Table.HeaderCell>
                                <Table.HeaderCell>Genres</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row> 
                                <Label color='red' ribbon size='mini'><Table.Cell>{movie.status}</Table.Cell></Label>
                                <Table.Cell>{movie.revenue}</Table.Cell>
                                <Table.Cell>{movie.popularity}</Table.Cell>
                                <Table.Cell>{movie.budget}</Table.Cell>
                                <Table.Cell>{movie.genres[0].name}</Table.Cell>
                            </Table.Row>
                            {
                                movie.genres.map((item, id) => (
                                    <Table.Row key={id}>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>

                    </Table>
                    </Segment>
                <Segment textAlign='center' basic>
                    <Button color='facebook' onClick={onToggleActorView}>Toggle actor view</Button>
                </Segment>

                
                {
                    show ? <Segment><Grid>
                        <Grid.Row>
                            {crew.map((item, id) => (
                                item.profile_path !== null ? <Fragment key={id}>
                                    <div class="card" >
                                        <img src={`${IMAGE_URL}${IMAGE_SIZE1}${item.profile_path}`} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{item.name}</h5>
                                            <p class="card-text">Character: {item.character} </p>
                                        </div>
                                    </div>
                                </Fragment> : null
                            ))}
                        </Grid.Row>
                    </Grid></Segment> : null
                }
                    
                    
            </Container> : null}
        </Fragment>
    )
}

export default Details;