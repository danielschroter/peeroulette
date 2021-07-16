import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

const app = require("express")
const http = require("http").Server(app);
const io = require("socket.io")(http);


io.on('connection', function (socket) {
    console.log('a user connected')
});

http.listen(3000, function () {
    console.log('listening on *:3000')
});