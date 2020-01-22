import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Image, List, Container, Segment, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as action from '../../action';
import { Link } from 'react-router-dom';

const Favorites = ({ state, AllFavorites }) => {
    const { signIn, login } = state;
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    console.log(state)
    useEffect(() => {
        if (signIn) {
            axios.get(`/api/favorite?table=${login}`)
            .then((res) => {
                AllFavorites(res.data)
                setFavoriteMovies(res.data)
                console.log(res.data)
            })
        }
    }, [])

    const onDeleteMovie = (title, id) => {
        axios.delete(`/api/favorite/delete?table=${login}&&title=${title}&&id=${id}`)
        .then(() => {
            axios.get(`/api/favorite?table=${login}`)
            .then((res) => {
                AllFavorites(res.data)
                setFavoriteMovies(res.data)
            }) 
        })
    }

    return (
        <Fragment>
            <Container style={{ marginTop: 40 }}>
                <Segment>
                    <List animated verticalAlign='middle' divided>
                        {favoriteMovies.map((item, id) => (
                            <List.Item key={id}>
                                <Image avatar src={item.img} />
                                <List.Content>
                                    <List.Header style={{  textDecoration: 'none' }} as={Link} to={`movie/${item.movieId}`}>{item.title}</List.Header>
                                </List.Content>
                                <List.Content floated='right'><Button color='red' icon onClick={() => onDeleteMovie(item.title, item.id)} ><Icon name='trash alternate'></Icon></Button></List.Content>
                            </List.Item>
                        ))}
                    </List></Segment>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps,action)(Favorites);