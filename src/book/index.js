const bookService = require('./services/BookService');

const bookController = require('./controllers/BookController');

module.exports = {
    services: {
        bookService,
    },
    controllers: {
        bookController,
    },
};
