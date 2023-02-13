const { env } = process;

const config = {
    port: env.PORT,
    mongo: {
        username: env.MONGO_USERNAME,
        password: env.MONGO_PASSWORD,
        host: env.MONGO_HOST,
        port: env.MONGO_PORT,
        database: env.MONGO_DATABASE,
    },
};

module.exports = config;
