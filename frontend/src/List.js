import React from 'react';

import { Link } from "react-router-dom";
import CarElement from './CarElement';

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      const app = this;
      return (
        <div>
          <h1>Liste des voitures</h1>
          <Link to="/add" className="btn btn-primary">Add</Link>
          <ul>
            {this.props.list.map(function(item, key) {
              return <CarElement key={key} car={item} deleteCar={app.props.deleteCar} />
            })}
          </ul>
        </div>
      );
    }
}