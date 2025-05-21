const express = require('express');
const app = require('./server'); 

describe('Server Initialization', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(8080, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });
});
