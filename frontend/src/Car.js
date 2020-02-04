import React from 'react';

import { Link } from "react-router-dom";

export default class Car extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
          currentCar: {
              id: "",
              name: "",
              fuelType: "",
              year: ""
          }
      }
    }

    componentDidMount(){        
        var id = this.props.match.params.id;
        if(id){
            this.getOneCar(id);
        }
    }

    getOneCar(id){
        const app = this;

        fetch(`/api/cars/${id}`)
            .then(function(response){
                response.json().then(function(data) {
                    app.setState({
                        currentCar: data
                    })
                });   
            })
            .catch(function(err) {
                console.log('Fetch Error: ', err);
            }); 
    }

    render() {
      return (
        <div>
            <Link to="/" className="btn btn-warning">Retour</Link>
            <h2>Car display</h2>
            <h5>Id: {this.state.currentCar.id}</h5>
            <h5>Nom: {this.state.currentCar.name}</h5>
            <h5>Carburant: {this.state.currentCar.fuelType}</h5>
            <h5>Année: {this.state.currentCar.year}</h5>
        </div>
      );
    }
}