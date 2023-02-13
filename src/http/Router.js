const { Router } = require('express');


class ApiRouter {
    constructor(opts) {
        this.bookController = opts.bookController;
    }

    book() {
        const router = Router();
        router.put('/', this.bookController.add);
        return router;
    }
}

module.exports = ApiRouter;
