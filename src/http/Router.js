const { Router } = require('express');


class ApiRouter {
    constructor(opts) {
        this.healthController = opts.healthController;
    }

    health() {
        const router = Router();
        router.get('/', this.healthController.get);
        return router;
    }
}

module.exports = ApiRouter;
