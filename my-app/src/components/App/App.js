import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Segment, Header, Icon, Grid, Container, Divider, Image, Form, Button, Message } from 'semantic-ui-react';
import Movies from '../Movies/Movies';
import Menu from '../Nav/Nav';
import Details from '../Details/Details';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import Favorite from '../Favorites/Favorites';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Menu />
        <Switch >
          <Route path="/"
            render={() => {
              return <Movies page_id={1} />
            }}
            exact />
            <Route path="/page/:id"
            render={({ match }) => {
              const { id } = match.params;
              return <Movies page_id={id} />
            }}
            exact />
          <Route path="/SignIn" component={SignIn} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/favorite' component={Favorite} />

          <Route path='/movie/:id'
             render={({ match }) => {
             const { id } = match.params;
             return <Details movie_id={id}/>;
            }}/>

          <Route render={() => <h2>Page not found</h2>} />
        </Switch>

        <div className='footer'>
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '2em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={8}>
            <Header inverted as='h4' content='Social networks' />
            <a href='https://www.instagram.com/sultan_sembek/' target="_blank"><Icon name='instagram' size='big' color='orange'></Icon></a>
            <a href='https://sembeksultan23@gmail.com' target="_blank"><Icon name='mail' size='big' color='grey'></Icon></a>
            <a href='https://twitter.com/Sphinx39203680?lang=en' target="_blank"><Icon name='twitter' size='big' color='blue'></Icon></a>
            <a href='https://api.whatsapp.com/send?phone=77473433882&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5,' target="_blank"><Icon name='whatsapp' size='big' color='green'></Icon></a>
          </Grid.Column>
          
          <Grid.Column width={7}>
            <Header inverted as='h4' content='What is this web application for?' />
            <p>This web application can save your plans, etc.</p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src='/img/logoSphinx.png' style={{ width: 50 }}/>
          <Header as='h3' inverted>Powered by <a href='https://github.com/Sphinx40' target="_blank">Sphinx</a></Header>
      </Container>
    </Segment></div>
      </Router>
      
    </Fragment>
  )
}

export default App;
