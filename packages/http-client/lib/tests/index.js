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

    describe('Test Get all cars', () => {
        it('test /', async () => {
            fetchMock.get(`http://${server_address}:${server_port}/api/cars`, [{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
            const client = httpclient(server_address, server_port);
            client.findAll().then((changes) => {
                expect(changes).to.eql([{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('get');
            })
        });
    });

    describe('Test Get one car', () => {
        it('test /', async () => {
            fetchMock.get(`http://${server_address}:${server_port}/api/cars`, [{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
            const client = httpclient(server_address, server_port);
            client.findOne().then((changes) => {
                expect(changes).to.eql([{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('get');
            })
        });
    });

    describe('Test Post add car', () => {
        it('test /', async () => {
            fetchMock.post(`http://${server_address}:${server_port}/api/cars`, {eeee: "tttt"});
            const client = httpclient(server_address, server_port);
            client.add().then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
            })
        });
    });

    describe('Test Delete remove a car', () => {
        it('test /', async () => {
            fetchMock.delete(`http://${server_address}:${server_port}/api/cars`, {eeee: "tttt"});
            const client = httpclient(server_address, server_port);
            client.remove().then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('delete');
            })
        });
    });

    describe('Test Put update a car', () => {
        it('test /', async () => {
            fetchMock.put(`http://${server_address}:${server_port}/api/cars`, {eeee: "tttt"});
            const client = httpclient(server_address, server_port);
            client.update().then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('put');
            })
        });
    });
});