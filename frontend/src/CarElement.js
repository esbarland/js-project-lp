import React from 'react';

import { Link } from "react-router-dom";

export default class CarElement extends React.Component {

    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){      
      this.props.deleteCar(this.props.car.id);
    }

    render() {
      return (
        <div className="card">
            <div className="card-header">
                Référence: {this.props.car.id}
            </div>
            <div className="card-body">
                <h5 className="card-title">Nom: {this.props.car.name}</h5>
                <Link to={this.props.car.id} className="btn btn-primary">Plus</Link>
                <Link to={"/edit/" + this.props.car.id} className="btn btn-success">Editer</Link>
                <button className="btn btn-danger" onClick={this.handleClick}>Supprimer</button>
            </div>
            <br/>
        </div>
      );
    }
}