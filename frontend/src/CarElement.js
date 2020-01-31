import React from 'react';

import { Link } from "react-router-dom";

export default class CarElement extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div className="card">
            <div className="card-header">
                Référence: {this.props.car.id}
            </div>
            <div className="card-body">
                <h5 className="card-title">Nom: {this.props.car.name}</h5>
                <Link to={this.props.car.id} className="btn btn-primary disabled">Plus</Link>
            </div>
            <br/>
        </div>
      );
    }
}