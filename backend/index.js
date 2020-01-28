const uuidv4 = require('uuid/v4');
const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')

const { Pool } = require('pg')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())

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
app.get('/api/cars/:id', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })

      var id = req.params.id;
      var car;

      pool.query('SELECT * FROM cars WHERE cars.id = $1', [id], (err, result) => {
        pool.end();
        if(err == null){
          car = result.rows[0];
          res.status(200).send(car);
        }else{
          res.status(404).send();
        }
      });
});

/**
 * POST one car
 */

app.post('/api/cars', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
      var uuid = uuidv4();
      var name = req.body.name;
      var fuelType = req.body.fuelType;
      var year = req.body.year;

      pool.query('INSERT INTO cars VALUES($1,$2,$3,$4)', [uuid, name, fuelType, year], (err, result) => {
        var car = {
          "id": uuid,
          "name": name,
          "fuelType": fuelType,
          "year": year          
        }
        pool.end();

        if(err == null){
          res.status(201).send(car);
        }else{
          res.status(400).send();
        }
        
      })
});

/**
 * DELETE one car
 */
app.delete('/api/cars/:id', (req, res) =>{
  const pool = new Pool({
      user: 'db_user',
      host: 'database',
      database: 'db_db',
      password: 'db_password'
    })

    var id = req.params.id;

    pool.query('DELETE FROM cars WHERE id = $1', [id], (err, result) => {
      pool.end();

      if(err == null){
        res.status(204).send();
      }else{
        res.status(404).send();
      }
    });
});

/**
 * PUT one car
 */
app.put('/api/cars/:id', (req, res) =>{
  const pool = new Pool({
      user: 'db_user',
      host: 'database',
      database: 'db_db',
      password: 'db_password'
    })

    var id = req.params.id;
    var name = req.body.name;
    var fuelType = req.body.fuelType;
    var year = req.body.year;

    if(name != null && fuelType != null && year != null){
      pool.query('UPDATE cars SET name = $1, fuelType = $2, year = $3 WHERE id = $4', [name, fuelType, year, id], (err, result) => {
        pool.end();
        if(err == null){
          res.status(200).send();
        }else{
          res.status(404).send();
        }
      });
    }else{
      res.status(400).send();
    }
    
});

module.exports = app;