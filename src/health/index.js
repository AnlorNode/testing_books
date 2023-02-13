const healthService = require('./services/HealthService');

const healthController = require('./controllers/HealthController');

module.exports = {
    services: {
        healthService,
    },
    controllers: {
        healthController,
    },
};
