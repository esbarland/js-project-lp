import React from 'react';

import { Link } from "react-router-dom";

export default class Add extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        name: "",
        fuelType: "",
        year: ""
      };
    }

    handleChange = event => {
      const { name, value } = event.target
  
      this.setState({
        [name]: value,
      })
    }

    render() {      
      return (
        <div>
          <h1>Formulaire d'ajout d'une Voiture</h1>
          <form onSubmit={this.props.submit}>              

              <div className="form-group">
                <label forname="carName">Nom</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  id="carName" 
                  placeholder="Nom de la voiture"
                  value={this.state.name}
                  onChange={this.handleChange}
                  autoFocus 
                  required />
              </div>
              <div className="form-group">
                <label forname="carFuelType">Type de carburant</label>
                <input 
                  type="text" 
                  name="fuelType" 
                  className="form-control" 
                  id="carFuelType" 
                  placeholder="Type de carburant de la voiture"
                  value={this.state.fuelType}
                  onChange={this.handleChange}
                  required />                
              </div>
              <div className="form-group">
                <label forname="carYear">Année</label>
                <input 
                  type="text" 
                  name="year" 
                  className="form-control" 
                  id="carYear" 
                  placeholder="Année de sortie de la voiture"
                  value={this.state.year}
                  onChange={this.handleChange}
                  required /> 
              </div>

              <div className="row justify-content-between mx-auto">
                <Link to="/" className="btn btn-warning">Retour</Link>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div> 
          </form>

        </div>
      );
    }
}