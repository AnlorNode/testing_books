const express = require('express');
const { json } = require('body-parser');



class HttpServer {
    constructor(opts) {
        this.config = opts.config;

        this.logger = opts.logger;
        this.router = opts.router;

        this.app = express();

        this.app.use(json());
    }

    api() {
        this.app.use('/book', this.router.book());
        this.app.use('/books', this.router.books());
        return this.app;
    }
}

module.exports = HttpServer;
