const mongoose = require('mongoose');

class MongoDatastore {
    constructor(config, logger) {
        if (!config) {
            throw new Error('MongoDatastore: option config is required');
        }
        this.logger = logger;
        this.config = config;
    }

    connect() {
        const mongo = mongoose.connect(this.buildConnection(this.config));
        const { connection } = mongoose;
        connection
            .on('connect', () => this.logger.info('Connected to Mongo', 'mongo', { connection }))
            .on('error', (error) => this.logger.error('Connection Mongo error', 'mongo', { error }));
        this.provider = mongo;
        return mongo;
    }

    getProvider() {
        return this.provider;
    }

    buildConnection({
        username,
        password,
        host,

        database,

    }) {
        const credentials = username && password ? `${username}:${password}@` : '';
console.log(`mongodb+srv://${credentials}${host}/${database}`);
        return `mongodb+srv://${credentials}${host}/${database}`;
    }
}
module.exports = MongoDatastore;
