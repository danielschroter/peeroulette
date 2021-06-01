"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import Page from './Page'

const textStyle = {
    'marginTop': '200px',
    'marginBottom': '36px',
    'paddingLeft': '400px',
    'fontSize': '100px',
};

export const MovieList = ({data, onDelete}) => (
    <Page>
        <p style = {textStyle}>
        Hello world
        </p>
    </Page>
);

