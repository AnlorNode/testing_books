class BooksService {
    constructor(opts) {
        this.logger = opts.logger;
        this.books = opts.Books;
    }

    async addBook(data) {
        const book = await this.books.create(data);
        return book;
    }

    async updateBook({ id, ...data }) {
        const book = await this.books.findByIdAndUpdate(id, data, { new: true });
        return book;
    }

    async getBookDyId(id) {
        const book = await this.books.findOne({ _id: id });
        return book;
    }

    async getbooksAll({ pagination = 0, limit = 5 }) {
        const books = await this.books.find()

            .skip(limit * (pagination - 1))
            .limit(limit)
            .sort({ _id: 'desc' });
        return books;
    }
}

module.exports = BooksService;
