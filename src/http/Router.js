const { Router } = require('express');

class ApiRouter {
    constructor(opts) {
        this.bookController = opts.bookController;
    }

    book() {
        const router = Router();
        router.post('/', this.bookController.addBook);
        router.put('/', this.bookController.updateBook);
        router.get('/:id', this.bookController.getBookDyId);
        router.delete('/:id', this.bookController.deleteBookDyId);
        return router;
    }

    books() {
        const router = Router();

        router.get('/:pagination', this.bookController.getbooksAll);
        router.get('/:pagination/:limit?', this.bookController.getbooksAll);
        return router;
    }
}

module.exports = ApiRouter;
