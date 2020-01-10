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
    function findOne(){
        var options =  {
            method: 'get',
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
     * Request Post add a new car
     */
    function add() {
        var options =  {
            method: 'post',
            body: JSON.stringify({eee: "uuuuu"})
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars`, options)
            .then(resolve).catch(reject)
        });
    }

    /**
     * Request Delete remove a car
     */
    function remove() {
        var options =  {
            method: 'delete',
            body: JSON.stringify({eee: "uuuuu"})
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars`, options)
            .then(resolve).catch(reject)
        });
    }

    /**
     * Request Put update a car
     */
    function update(){
        var options =  {
            method: 'put',
            body: JSON.stringify({eee: "uuuuu"})
        };

        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/cars`, options)
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