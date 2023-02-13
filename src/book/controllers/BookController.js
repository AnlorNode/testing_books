const bind = require('auto-bind');

class BookController {
    constructor(opts) {
        this.validators = opts.validators;
        this.bookService = opts.bookService;
        bind(this);
    }

    async add({ body }, res) {
        const validators = this.validators.addBook;
        try {
            const value = await validators.validateAsync(body);
            const statistics = await this.bookService.get(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = BookController;
