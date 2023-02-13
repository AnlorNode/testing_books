const { Router } = require('express');


class ApiRouter {
    constructor(opts) {
        this.healthController = opts.healthController;
    }

    health() {
        const router = Router();
        router.put('/', this.healthController.add);
        return router;
    }
}

module.exports = ApiRouter;
