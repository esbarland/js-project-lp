import React, { Component } from "react";

import List from './List';
import Add from './Add';
import Car from './Car';
import Edit from './Edit';

import { Router, Switch, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const fetch = require("node-fetch");

export default class App extends Component  {

    constructor(props) {
        super(props)
        this.state = { list: [] }
        // Le bind permet de fixer le contexte au composant App sinon le this.setState dans le submit sera appelé dans le composant Add
        this.submit = this.submit.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    componentDidMount() {
        this.getAllcars();
    }

    submit(event) {
        const form = new FormData(event.target);
        // Enlève l'event par défaut (refresh de la page)
        event.preventDefault();
        history.push("/");

        var nameForm = form.get('name');
        var fuelTypeForm = form.get('fuelType');
        var yearForm = form.get('year');

        var options =  {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name: nameForm, fuelType: fuelTypeForm, year: yearForm}),
        };

        const app = this;

        fetch('/api/cars/', options)
            .then(function(response){
                response.json().then(function(data) {
                    app.setState((prevState, props) => {
                        prevState.list = [...prevState.list, data]
                        return prevState;
                    })
                });
            })
            .catch(function(err) {
                console.log('Fetch Error: ', err);
            });  
    }

    handleEditSubmit(event) {
        const form = new FormData(event.target);
        event.preventDefault();
        history.push("/");

        var nameForm = form.get('name');
        var fuelTypeForm = form.get('fuelType');
        var yearForm = form.get('year');
    
        var options =  {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name: nameForm, fuelType: fuelTypeForm, year: yearForm}),
        };
    
        //const app = this;
    
        fetch(`/api/cars/${this.state.id}`, options)
            .then(function(response){
                response.json().then(function(data) {
                  console.log("put response: ", data);
                  //update de la liste
                });
            })
            .catch(function(err) {
                console.log('Fetch Error: ', err);
            });  
    }

    getAllcars() {
        const app = this;
        var options =  {
            method: 'get',
        };

        fetch('/api/cars', options)
            .then(function(response){
                response.json().then(function(data) {
                    app.setState({
                        list: data
                    })
                });            
            })
            .catch(function(err) {
                console.log('Fetch Error: ', err);
            });            
    }


    deleteCar(id){     
        const app = this;
        
        var options =  {
            method: 'delete',
        };

        fetch(`/api/cars/${id}`, options)
            .then(function(){
                var array = app.state.list.filter(function(item) {
                    return item.id !== id
                });
                app.setState({
                    list: array
                });
            }).catch(function(err){
                console.log('Fetch Error: ', err);
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
                        <List list={ this.state.list } deleteCar={this.deleteCar}/>
                    </Route>
                    <Route exact path="/:id" component={Car} />
                    <Route exact path="/edit/:id" component={props => <Edit id={props.match.params.id} handleEditSubmit={this.handleEditSubmit} />} />

                </Switch>
            </Router>
        )
    }
}