import React from 'react';

import { Link } from "react-router-dom";

export default class Edit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      id: "",
      name: "",
      fuelType: "",
      year: ""
    };
  }

  componentDidMount(){    
    var id = this.props.id;
    if(id){
        this.getOneCar(id);
    }
  }

  getOneCar(id){
    const app = this;
    var options =  {
        method: 'get',
    };

    fetch(`/api/cars/${id}`, options)
        .then(function(response){
            response.json().then(function(data) {
                app.setState({
                    id: data.id,
                    name: data.name,
                    fuelType: data.fueltype,
                    year: data.year
                })
            });   
        })
        .catch(function(err) {
            console.log('Fetch Error: ', err);
        }); 
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
        <h1>Formulaire d'édition d'une Voiture</h1>
        <form onSubmit={this.props.handleEditSubmit}>    
        
          <div className="form-group">
            <input 
              type="text" 
              name="id" 
              className="form-control" 
              id="carId" 
              placeholder="Id de la voiture"
              value={this.state.id}    
              onChange={this.handleChange}            
              hidden />
          </div>          

          <div className="form-group">
            <label htmlFor="carName">Nom</label>
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
            <label htmlFor="carFuelType">Type de carburant</label>
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
            <label htmlFor="carYear">Année</label>
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
            <button type="submit" className="btn btn-primary">Sauvegarder</button>
          </div> 
        </form>

      </div>
    );
  }
}