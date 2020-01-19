import React, { useState } from 'react';
import { Menu, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as action from '../../action';

const Nav = ({ state, sign, log, menuName, history, pass }) => {
  const { signIn, menu, login } = state;

  const trigger = (
    <span>
      <Icon name='user' /> {login}
    </span>
  )

  const handleItemClick = (name, text) => {
    if (name === 'Movies app') {
      menuName(name)
    }
    if (text === 'Sign-out') {
      if (signIn) {
        sign(false)
        log('')
        pass('')
        menuName('Movies app')
        history.push('/')
      }
    }
    if (name === 'Sign in') {
      menuName(name)
    }
    if (name === 'Sign up') {
      menuName(name)
    }

  }


  return (
    <Segment attached='top' raised>
      <Menu pointing  secondary stackable >
        <Menu.Item
          icon='film'
          name='Movies app'
          active={menu === 'Movies app'}
          onClick={(e, { name }) => handleItemClick(name)}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
        {signIn ? null : 
          <Menu.Item
          icon={'sign in'}
          name={'Sign in'}
          active={menu === 'Sign in'}
          onClick={(e, { name }) => handleItemClick(name)}
          as={Link}
          to='/SignIn'
        />
        } 

        {signIn ? <Menu.Item>
        <Dropdown trigger={trigger} icon={null} pointing='top right'>
              <Dropdown.Menu>
                <Dropdown.Item text='Sign-out' icon='sign out' onClick={(e, { value }) => handleItemClick('','Sign-out')}/>
              </Dropdown.Menu>
            </Dropdown></Menu.Item> : null }

        {signIn ? null :
          <Menu.Item
            icon='signup'
            name='Sign up'
            active={menu === 'Sign up'}
            onClick={(e, { name }) => handleItemClick(name)}
            as={Link}
            to='/SignUp'
          />
        }
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, action)(withRouter(Nav));