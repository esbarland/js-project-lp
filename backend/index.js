const express = require('express');
const morgan = require('morgan');

const { Pool } = require('pg')

const app = express();

app.use(morgan('dev'));

app.get('/api/database/test', (req, res) => {
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
    pool.query('SELECT NOW()', (err, result) => {
        pool.end()
        res.send(`Il est ${result.rows[0].now} salut la modif`)
    })
});

/**
 * GET All cars
 */
app.get('/api/cars', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
      pool.query('SELECT * FROM cars', (err, result) => {
        pool.end();
        

        var cars = [];
        for(var key in result.rows){
            cars.push(result.rows[key]);
        }

        res.send(cars);
      })
});

/**
 * GET one car
 */
/*app.get('/api/cars/{id}', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
      pool.query('SELECT * FROM cars WHERE cars.id = $1', id, (err, result) => {
          pool.end();
          res.send(`${result}`);
      })
});*/

module.exports = app;