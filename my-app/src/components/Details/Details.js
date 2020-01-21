import React, { useState, Fragmen, useEffect, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import { Segment, Container, Button, Table, Divider, Label } from 'semantic-ui-react';
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
                console.log(res.data,'res')
            })
        axios.get(`${API_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=ru-RU`)
            .then((res) => {
                console.log(res.data)
            })
    }, [movie_id])

    /*<Table.Row>
                                {movie.genres.map((item,id) => (
                                    <Table.HeaderCell key={id}>{item.name}</Table.HeaderCell>
                                ))}
                            </Table.Row>*/


                            

                                

    return (
        <Fragment>
            {loading ?
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE}${movie.belongs_to_collection !== null ? movie.belongs_to_collection.backdrop_path : movie.backdrop_path}`}
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
                                    <Table.Row>
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
                    <Button color='instagram'>Toggle actor view</Button>
                </Segment>
                    
            </Container> : null}
        </Fragment>
    )
}

export default Details;