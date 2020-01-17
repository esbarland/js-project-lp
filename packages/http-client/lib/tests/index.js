const chai = require('chai');
const fetchMock = require('fetch-mock');
const fetch = require("node-fetch");
global.fetch = fetch;

const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const httpclient = require('../client')

const { expect } = chai;

const server_address = 'localhost';
const server_port = 7890;

describe('Test API Cars', () => {

    afterEach(fetchMock.resetBehavior)

    /**
     * Unit Test findAll()
     */
    describe('Test Get all cars', () => {
        it('test /', async () => {
            fetchMock.get(`http://${server_address}:${server_port}/api/cars`, [{name: 'AAA', fuelType: 'BBB', year: 333}]);
            const client = httpclient(server_address, server_port);
            client.findAll().then((changes) => {
                expect(changes).to.eql([{name: 'AAA', fuelType: 'BBB', year: 333}]);
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('get');
            })
        });
    });

    /**
     * Unit Test findOne()
     */
    describe('Test Get one car', () => {        
        it('test /', async () => {            
            fetchMock.get(`http://${server_address}:${server_port}/api/cars/1`, {name: 'AAA', fuelType: 'BBB', year: 333});
            const client = httpclient(server_address, server_port);
            client.findOne(1).then((changes) => {
                expect(changes).to.eql({name: 'AAA', fuelType: 'BBB', year: 333});
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('get');
            })
        });
    });

    /**
     * Unit Test add()
     */
    describe('Test Post add car', () => {
        it('test /', async () => {
            fetchMock.post(`http://${server_address}:${server_port}/api/cars`, {id: "ze55454ze5454z5g4", name: "tttt", fuelType: "aaaaa", year: 6485});
            const client = httpclient(server_address, server_port);
            client.add().then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
            })
        });
    });

    /**
     * Unit Test delete()
     */
    describe('Test Delete remove a car', () => {
        it('test /', async () => {
            fetchMock.delete(`http://${server_address}:${server_port}/api/cars/1`, {});
            const client = httpclient(server_address, server_port);
            client.remove(1).then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('delete');
            })
        });
    });

    /**
     * Unit Test update()
     */
    describe('Test Put update a car', () => {
        it('test /', async () => {
            fetchMock.put(`http://${server_address}:${server_port}/api/cars/1`, {name: "tttt", fuelType: "aaaaa", year: 3545});
            const client = httpclient(server_address, server_port);
            client.update(1).then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('put');
            })
        });
    });
});