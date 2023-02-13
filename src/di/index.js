/* eslint-disable global-require */

const path = require('path');
const { Telegraf } = require('telegraf');
const { createContainer, asValue, asClass, InjectionMode } = require('awilix');

const { WinstonLogger } = require('../lib');

const config = require('../config');
const HttpServer = require('../http/HttpServer');
const Router = require('../http/Router');
const WardenInstance = require('../WardenInstance');

const AppModules = [require('../health')];

const logger = new WinstonLogger({
    clayster: 'clayster_warden',
    instanceType: 'warden',
    instanceId: 1,
    logsDirectory: path.resolve(__dirname, '..', '..', 'logs'),
});

const bot = new Telegraf(config.telegramBotToken);
const botTwo = new Telegraf(config.telegramBotTokenTwo);

async function init() {
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
        bot: asValue(bot),
        botTwo: asValue(botTwo),
        logger: asValue(logger),

        router: asClass(Router).singleton(),
        httpServer: asClass(HttpServer).singleton(),
        instance: asClass(WardenInstance).singleton(),
        ...registrations,
    });

    return appContainer;
}

module.exports = init();
