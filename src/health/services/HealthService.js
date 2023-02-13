class HealthsService {
    constructor(opts) {
        this.logger = opts.logger;
    }

    async get() {
        return 'ok';
    }
}

module.exports = HealthsService;
