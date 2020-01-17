module.exports = function(host, port) {
    
    /**
     * Request Get all cars
     */
    function findAll() {
        var options =  {
            method: 'get'
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars`, options)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    /**
     * Request get one car
     */
    function findOne(id){
        var options =  {
            method: 'get',
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars/${id}`, options)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    /**
     * Request Post add a new car
     */
    function add(name, fuelType, year) {
        var options =  {
            method: 'post',
            body: JSON.stringify({name: name, fuelType: fuelType, year: year})
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars`, options)
            .then(resolve).catch(reject)
        });
    }

    /**
     * Request Delete remove a car
     */
    function remove(id) {
        var options =  {
            method: 'delete',
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars/${id}`, options)
            .then(resolve).catch(reject)
        });
    }

    /**
     * Request Put update a car
     */
    function update(id, name, fuelType, year){
        var options =  {
            method: 'put',
            body: JSON.stringify({name: name, fuelType: fuelType, year: year})
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars/${id}`, options)
            .then(resolve).catch(reject)
        });
    }



    return {
        findAll: findAll,
        findOne: findOne,
        add: add,
        remove: remove,
        update: update,
    }
}