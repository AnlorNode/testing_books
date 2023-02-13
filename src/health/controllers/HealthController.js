const bind = require('auto-bind');

class HealthController {
    constructor(opts) {
        this.healthService = opts.healthService;
        bind(this);
    }

    async get(req, res) {
        const statistics = await this.healthService.get();

        res.json(statistics);
    }
}

module.exports = HealthController;
