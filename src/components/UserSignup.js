"use strict";

import React from 'react';
//import { Card, Button, TextField } from 'react-md';
import {Link, withRouter} from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import {Container, Form, Jumbotron, Button} from "react-bootstrap";


const style = { maxWidth: 500 };


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>

                <Container>

                    <div className="container">
                        <div className="row justify-content-md-center" style={{"marginTop":"100px", 'marginBottom': "100px"}}>
                            <div className="col col-lg-5">
                                <Jumbotron>
                                    <div className="text-center" style={{'marginBottom': "40px"}}>
                                        <h3>Register</h3>
                                    </div>

                                    <Form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control id="UsernameField"
                                                          label="Username"
                                                          type="text"
                                                          className="md-row"
                                                          required={true}
                                                          value={this.state.username}
                                                          onChange={e => {this.handleChangeUsername(e.target.value)}}
                                                          placeholder="Enter username" />
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password"
                                                          label="Password"
                                                          id="PasswordField"
                                                          className="md-row"
                                                          required={true}
                                                          value={this.state.password}
                                                          onChange={e => {this.handleChangePassword(e.target.value)}}
                                                          placeholder="Enter password" />
                                        </Form.Group>

                                        <div className="btn-toolbar" style={{'justify-content': 'center', 'display': 'flex'}}>

                                            <Button className="btn mr-3"
                                                    variant="outline-primary"
                                                    id="submit"
                                                    type="submit"
                                                    onClick={this.handleSubmit}>Register</Button>
                                            <Button className="btn mr-3"
                                                    variant="outline-danger"
                                                    id="reset"
                                                    type="reset"
                                                    >Dismiss</Button>
                                        </div>
                                        <div className="text-center" style={{"marginTop":"20px"}}>
                                            <Link to={'/register'} className="md-cell text-left">Not registered yet?</Link>
                                        </div>
                                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                                    </Form>
                                </Jumbotron>
                            </div>
                        </div>
                    </div>
                </Container>

                {/*
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Username"
                            id="UsernameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>*/}
            </Page>
        );
    }
}

export default withRouter(UserSignup);