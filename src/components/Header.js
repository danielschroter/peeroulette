"use strict";

import React from 'react';
//import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'

import styled from "styled-components";


const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    
    &:hover {
    color: white;
    }
  }
`;


//import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (

            <Styles>
                <Navbar expand="lg">
                    <Navbar.Brand href="/">Peeroulette</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/#/login">Login</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/#/register">Register</Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>


        /*<Toolbar
                colored
                nav={<Button onClick={() => this.props.history.push('/')} icon>home</Button>}
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>*/
        );
    }
}


export default withRouter(Header);
