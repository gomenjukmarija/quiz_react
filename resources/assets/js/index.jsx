import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Question from "./components/Question";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import Login from "./components/Login";
import User from "./components/User";
import auth from "./components/auth";
import admin from "./components/admin";
import store  from "./store/store";

ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Layout} >
            <Route path = "register" component = { Register } ></Route>
            <Route path = "login" component = { Login }></Route>
            <Route path = "admin" component = { RegisterAdmin }></Route>
            <Route onEnter={auth}>
                <IndexRoute component={Home} ></IndexRoute>
                <Route onEnter={admin}>
                    <Route path = "question" component = { Question } ></Route>                 
                    <Route path = "user" component = { User } ></Route>
                </Route>                         
            </Route>
        </Route>
    </Router>
  </Provider>,
document.getElementById('app'));