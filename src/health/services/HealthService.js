class HealthsService {
    constructor(opts) {
        this.logger = opts.logger;
        this.Books = opts.Books;
    }

    async get() {
        const Books = await this.Books.create({
            title: 'title',
            author: 'author',
        });

        return Books;
    }
}

module.exports = HealthsService;
