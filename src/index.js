const container = require('./di');

container.then((app) => {
    app.resolve('instance').start();
})
    .catch((error) => {
        console.error(
            JSON.stringify({
                instance: 'warden',
                instanceId: 'non-inited',
                date: new Date(),
                level: 'error',
                message: error.name,
                stack: error.stack || '',
                category: 'warden:bootstrap',
            }),
        );
    });


