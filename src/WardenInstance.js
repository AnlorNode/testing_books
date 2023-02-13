class WardenInstance {
    constructor(opts) {
        this.config = opts.config;
        this.httpServer = opts.httpServer;
        this.logger = opts.logger;
        this.port = opts.config.port;
    }

    start() {
        try {
            this.httpServer.api().listen(this.port, () => this.logger.info(`Start webserver at ${this.port}`));
        } catch (err) {
            this.logger.error(`${err.stack || err}`);
        }
    }
}

module.exports = WardenInstance;
