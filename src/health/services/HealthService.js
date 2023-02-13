class HealthsService {
    constructor(opts) {
        this.logger = opts.logger;
        this.Books = opts.Books;
    }

    async get(data) {
        const Books = await this.Books.create(data);
        return Books;
    }
}

module.exports = HealthsService;
