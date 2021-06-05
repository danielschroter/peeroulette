"use strict";

import React from 'react';
//import { DataTable, TableHeader, TableBody, TableRow, TableColumn , Button , Grid } from 'react-md';

//import Jumbotron from 'react-bootstrap/Jumbotron';
import { Button, Container } from 'react-bootstrap';

import Page from './Page'


export const MovieList = ({data, onDelete}) => (
    <Page>

    <Container>
        <div className="text-center" style={{'marginTop': '200px', 'marginBottom': '200px'}}>
            <p>
                <h1 className="text-center">Weclome to peeroulette</h1>
            </p>


            <div className="btn-toolbar" style={{'justify-content': 'center', 'display': 'flex'}}>

                    <Button className="btn mr-3" variant="outline-primary" href="/#/login">Register</Button>
                    <Button className="btn mr-3" variant="outline-success" href="/#/register">Sign In</Button>
            </div>
        </div>

    </Container>

    </Page>
);

