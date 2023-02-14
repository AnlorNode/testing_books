const bind = require('auto-bind');

class BookController {
    constructor(opts) {
        this.validators = opts.validators;
        this.bookService = opts.bookService;
        bind(this);
    }

    async addBook({ body }, res) {
        const validators = this.validators.addBook;
        try {
            const value = await validators.validateAsync(body);
            const statistics = await this.bookService.addBook(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }

    async updateBook({ body }, res) {
        const validators = this.validators.updateBook;
        try {
            const value = await validators.validateAsync(body);
            const statistics = await this.bookService.updateBook(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }

    async getBookDyId({ params }, res) {
        const validators = this.validators.getBookDyId;
        try {
            const value = await validators.validateAsync(params.id);
            const statistics = await this.bookService.getBookDyId(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }

    async deleteBookDyId({ params }, res) {
        const validators = this.validators.getBookDyId;
        try {
            const value = await validators.validateAsync(params.id);
            const statistics = await this.bookService.deleteBookDyId(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }

    async getbooksAll({ params }, res) {
        const validators = this.validators.getbooksAll;
        try {
            const value = await validators.validateAsync(params);
            const statistics = await this.bookService.getbooksAll(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = BookController;
