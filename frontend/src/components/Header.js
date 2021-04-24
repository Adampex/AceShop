import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <i className='fab fa-asymmetrik mr-1'></i>  
            AceShop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ml-auto">
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart mr-1'></i>
              Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='login'>
              <Nav.Link>
                <i className='fas fa-user mr-1'></i>
              Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
          
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
