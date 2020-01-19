import React, { useState } from 'react';
import axios from 'axios';
import { Segment, Container, Label, Form, Button, Divider, Header, Icon, Grid, Image, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../action';

const SignUp = ({ log, state, menuName, sign, history, pass }) => {
    const [redForm, setRegForm] = useState({
        login: '',
        password: ''
    });
    const [error, setError] = useState(false);
    const [errorFields, setErrorFields] = useState(false);
    const [active, setActive] = useState(false);
    const [passwordCharacters, setPasswordCharacters] = useState(false)

    const onCreate = () => {
        if (redForm.login !== '' && redForm.password !== '') {
            if (redForm.password.length>=5){
            setPasswordCharacters(false)
            setErrorFields(false)
            axios.get(`/api/signup/all?login=${redForm.login}`)
                .then((res) => {
                    if (res.data.length === 0) {
                        axios.post('/api/signup/create', redForm)
                        axios.post('/api/signup/createTable', redForm)
                        log(redForm.login)
                        pass(redForm.password)
                        setError(false)
                        sign(true)
                        history.push('/')
                        setActive(true)
                    } else {
                        setError(true)
                    }
                })
            } else {
                setPasswordCharacters(true)
            }
        } else {
            setErrorFields(true)
            setError(false)
        }
    }

    return (
        <Container>
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/img/logo.png' />Registration
      </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' onChange={(e) => setRegForm({ ...redForm, login: e.target.value })} />
                            {passwordCharacters ?
                                            <Label basic color='red' pointing='below'>
                                                Your password must be 5 characters or more
                                              </Label> : null
                            }
                            <Form.Input
                                fluid
                                icon='lock'
                                type='password'
                                iconPosition='left'
                                placeholder='Password'
                                onChange={(e) => setRegForm({ ...redForm, password: e.target.value })}
                            />
                            <Button color='teal' fluid size='large' onClick={onCreate}>
                                Sign-up
                            </Button>
                        </Segment>
                    </Form>
                    {error ? <Segment inverted color='red' secondary>
                            This account already exists
                            </Segment> : null}
                        {errorFields ? <Segment inverted color='red' secondary>
                            Fields can't be empty
                            </Segment> : null}
                    <Message>
                        <p>Do you have an account? <Link onClick={() => menuName('Sign in')} to='/SignIn'>Sign-in</Link></p>
                    </Message>
                </Grid.Column>
            </Grid>

        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps, action)(SignUp);