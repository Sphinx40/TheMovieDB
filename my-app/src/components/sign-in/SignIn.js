import React, { useState } from 'react';
import { Segment, Input, Container, Form, Divider, Button, Header, Icon, Checkbox, Grid, Image, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from '../../action';

const Sign = ({ log, state, sign, menuName, history, pass }) => {
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const [correct, setCorrect] = useState(false);
    const [errorFields, setErrorFields] = useState(false);
    const [active, setActive] = useState(false);

    const onSignIn = () => {
        if (form.login !== '' && form.password !== '') {
            setErrorFields(false)
            axios.get(`/api/signIn?login=${form.login}&&password=${form.password}`)
                .then((res) => {
                    if (res.data !== '') {
                        console.log(res.data,'res')
                        log(res.data.login)
                        pass(res.data.password)
                        setCorrect(false)
                        setActive(true)
                        sign(true)
                        setForm({ login: '', password: '' })
                        menuName('Notes App')
                        history.push('/')
                    } else {
                        setCorrect(true)
                        setForm({ login: '', password: '' })
                    }
                })
        } else {
            setErrorFields(true)
            setCorrect(false)
        }
    }
    return (
        <Container>            
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/img/logo.png' /> Log-in to your account
      </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                placeholder='Login'
                                icon='user'
                                iconPosition='left'
                                value={form.login}
                                onChange={(e) => setForm({ ...form, login: e.target.value })}
                            />
                            <Form.Input
                                fluid
                                placeholder='Password'
                                icon='lock'
                                iconPosition='left'
                                type={'password'}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })} />


                            <Button color='teal' fluid size='large' onClick={onSignIn}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    {correct ? <Segment inverted color='red' secondary>
                        <Message.Header>Please check the spelling of the login and password.</Message.Header>
                    </Segment> : null}
                    {
                        errorFields ? <Segment inverted color='red' secondary>
                            <Message.Header>Fields can't be empty.</Message.Header>
                        </Segment> : null
                    }
                    {
                        active ? <Message
                        success
                        header='Your user registration was successful'
                        content='You may now log-in with the username you have chosen'
                      /> : null
                    }
                    <Message>
                        New to us? <Link onClick={() => menuName('Sign up')} to='/SignUp'>Sign Up</Link>
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

export default connect(mapStateToProps, action)(Sign);