const bind = require('auto-bind');

class HealthController {
    constructor(opts) {
        this.validators = opts.validators;
        this.healthService = opts.healthService;
        bind(this);
    }

    async add({ body }, res) {
        const validators = this.validators.addBook;
        try {
            const value = await validators.validateAsync(body);
            const statistics = await this.healthService.get(value);
            res.json(statistics);
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = HealthController;
