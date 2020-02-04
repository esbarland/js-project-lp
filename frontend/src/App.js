import React, { Component } from "react";

import List from './List';
import Add from './Add';
import Car from './Car';

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
    }

    componentDidMount() {
        this.getAllcars();
    }

    submit(event) {
        const form = new FormData(event.target);
        // Enlève l'event par défaut (refresh de la page)
        event.preventDefault();
        history.push("/");

        var name = form.get('name');
        var fuelType = form.get('fuelType');
        var year = form.get('year');

        console.log("submit event form: ", form.get('name'));
        console.log("submit event form: ", form.get('fuelType'));
        console.log("submit event form: ", form.get('year'));

        var car = {            
            name: name, 
            fuelType: fuelType, 
            year: year            
        }

        console.log("voiture: ", JSON.stringify(car));

        var options =  {
            method: 'post',
            body: JSON.stringify(car),
        };

        
        //post voiture
        //update la liste avec la valeur de retour du post

        fetch('/api/cars/', options)
            .then(function(response){
                response.json().then(function(data) {
                    console.log("add one car submit: ", data);
                    /*app.setState({
                        list: data
                    })*/
                });   
            })
            .catch(function(err) {
                console.log('Fetch Error: ', err);
            });  

        

        /*this.setState((prevState, props) => {
            prevState.list = [...prevState.list, data.get('name')]
            return prevState;
        })*/
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
        var options =  {
            method: 'delete',
        };

        fetch(`/api/cars/${id}`, options)
            .catch(function(err){
                console.log('Fetch Error: ', err);
            });

        var array = this.state.list.filter(function(item) {
            return item.id !== id
        });
        this.setState({
            list: array
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
                </Switch>
            </Router>
        )
    }
}