import React, { Component } from "react";

import List from './List'
import Add from './Add'

import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const fetch = require("node-fetch");

export default class App extends Component  {

    constructor(props) {
        super(props)
        this.state = { list: [] }
        // Le bind permet de fixer le contexte au composant App sinon le this.setState dans le submit sera appelé dans le composant Add
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        console.log("getAllCars: ");
        this.getAllcars();
    }

    submit(event) {
        const data = new FormData(event.target);
        // Enlève l'event par défaut (refresh de la page)
        event.preventDefault();
        history.push("/");
        this.setState((prevState, props) => {
            prevState.list = [...prevState.list, data.get('name')]
            return prevState
        })
    }

    getAllcars() {
        fetch('/api/cars')        
        .then(json => {
            console.log("success")            ;
            this.setState({
                list: json
            })    
        });
    }

    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/add">
                        <Add submit={this.submit} />
                    </Route>
                    <Route exact path="/">
                        <List list={ this.state.list }/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}