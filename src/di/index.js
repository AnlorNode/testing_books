/* eslint-disable global-require */

const path = require('path');
const { createContainer, asValue, asClass, InjectionMode } = require('awilix');

const { WinstonLogger, MongoDatastore } = require('../lib');

const config = require('../config');
const HttpServer = require('../http/HttpServer');
const Router = require('../http/Router');
const WardenInstance = require('../WardenInstance');
const Books = require('../db/models/Books');
const AppModules = [require('../health')];

const logger = new WinstonLogger({
    clayster: 'clayster_warden',
    instanceType: 'warden',
    instanceId: 1,
    logsDirectory: path.resolve(__dirname, '..', '..', 'logs'),
});
const mongoBase = new MongoDatastore(config.mongo, logger);

async function init() {
    await mongoBase.connect();
    const Services = Object.assign(...AppModules.map((m) => m.services));
    const Controllers = Object.assign(...AppModules.map((m) => m.controllers));
    const registrations = {};
    Object.entries({ ...Controllers, ...Services }).forEach(([name, value]) => {
        registrations[name] = asClass(value).singleton();
    });
    const appContainer = createContainer({
        injectionMode: InjectionMode.PROXY,
    });

    appContainer.register({
        config: asValue(config),
        mongoBase: asValue(mongoBase),
        logger: asValue(logger),
        router: asClass(Router).singleton(),
        httpServer: asClass(HttpServer).singleton(),
        instance: asClass(WardenInstance).singleton(),
        Books: asValue(Books),
        ...registrations,
    });

    return appContainer;
}

module.exports = init();
